import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { stripe } from '@/utils/stripe';
import { createPayment } from '@/utils/supabase/server/payments';
import { createOrder } from '@/utils/supabase/server/orders';

/**
 * @remarks
 * Handles POST requests to create an order and Stripe PaymentIntent.
 * Returns the client secret for the frontend to complete the payment.
 */
export async function POST(req: Request) {
  try {
    const body: {
      amount?: number;
      userId?: string;
      email?: string;
      name?: string;
      phone?: string;
      address?: string;
    } = await req.json();

    const { amount, userId, email, name, phone, address } = body;

    if (amount === undefined || userId === undefined || email === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, userId, or email' },
        { status: 400 }
      );
    }

    const orderId = uuidv4();
    const { data: order, error: orderError } = await createOrder({
      id: orderId,
      user_id: userId,
      email,
      phone: phone ?? null,
      name: name ?? null,
      address: address ?? null,
      total: amount,
      status: 'pending',
    });

    if (order === null || orderError !== null) {
      throw orderError ?? new Error('Failed to create order');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: {
        user_id: userId,
        order_id: orderId,
      },
    });

    const { data: payment, error: paymentError } = await createPayment({
      amount: Math.round(amount * 100),
      user_id: userId,
      status: 'pending',
      currency: 'usd',
      order_id: orderId,
      stripe_payment_intent_id: paymentIntent.id,
    });

    if (payment === null || paymentError !== null) {
      throw paymentError ?? new Error('Failed to create payment record');
    }

    const clientSecret = paymentIntent.client_secret ?? '';
    return NextResponse.json({ clientSecret });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');

    return NextResponse.json(
      {
        error: err.message,
        code: 'PAYMENT_INTENT_ERROR',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
