import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Обробляємо успішну оплату
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata.orderId;
    const userId = paymentIntent.metadata.userId;

    if (!orderId || !userId) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    // 1. Оновлюємо статус замовлення -> PAID
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid' } as any) // enum casting issue workaround
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
      return NextResponse.json({ error: 'DB Error' }, { status: 500 });
    }

    // 2. Створюємо запис про оплату
    await supabaseAdmin.from('payments').insert({
      order_id: orderId,
      user_id: userId,
      stripe_payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'succeeded',
    });

    // 3. Списуємо Stock (Склад)
    // Отримуємо товари замовлення
    const { data: items } = await supabaseAdmin
      .from('order_items')
      .select('variant_id, quantity')
      .eq('order_id', orderId);

    if (items) {
      for (const item of items) {
        // RPC функція була б краще для атомарності, але для простоти:
        // Викликаємо декремент
        await supabaseAdmin.rpc('decrement_stock', {
          row_id: item.variant_id!,
          amount: item.quantity ?? 0,
        });
      }
    }

    // 4. Очищаємо кошик користувача
    const { data: cart } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();
    if (cart) {
      await supabaseAdmin.from('cart_items').delete().eq('cart_id', cart.id);
    }
  }

  return NextResponse.json({ received: true });
}
