// app/api/stripe/webhook/route.ts
import { stripe } from '@/utils/stripe';
import { updatePaymentStatusByOrderId } from '@/utils/supabase/server/payments';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature error:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const { error } = await updatePaymentStatusByOrderId(
      paymentIntent.metadata.order_id,
      'succeeded'
    );

    if (error) console.error('Update succeeded error:', error);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const { error } = await updatePaymentStatusByOrderId(paymentIntent.metadata.order_id, 'failed');

    if (error) console.error('Update failed error:', error);
  }

  return NextResponse.json({ received: true });
}
