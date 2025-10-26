import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSupabaseServerClient } from '@/utils/supabase/supabaseBrowser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-09-30.clover' });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;
    const { error } = await supabase
      .from('payments')
      .update({ status: 'succeeded' })
      .eq('stripe_payment_intent_id', pi.id);

    if (error) console.error('Supabase update error:', error);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const pi = event.data.object as Stripe.PaymentIntent;
    const { error } = await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('stripe_payment_intent_id', pi.id);

    if (error) console.error('Supabase update error:', error);
  }

  return NextResponse.json({ received: true });
}