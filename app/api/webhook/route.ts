import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

import { stripe } from '@/utils/stripe';
import { updatePaymentStatusByOrderId } from '@/utils/supabase/server/payments';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * @remarks
 * Handles Stripe webhook events.
 * Updates the payment status in the database based on the event type.
 * Errors are collected and returned in the response instead of using console.
 */
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  if (sig === null || sig.trim() === '') {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const body = await req.text();
  const errors: string[] = [];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown signature error';
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { error } = await updatePaymentStatusByOrderId(
        paymentIntent.metadata.order_id ?? '',
        'succeeded'
      );
      if (error) errors.push(`Update succeeded error: ${error.message ?? error}`);
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { error } = await updatePaymentStatusByOrderId(
        paymentIntent.metadata.order_id ?? '',
        'failed'
      );
      if (error) errors.push(`Update failed error: ${error.message ?? error}`);
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown processing error';
    errors.push(error);
  }

  if (errors.length > 0) {
    return NextResponse.json({ received: true, errors }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
