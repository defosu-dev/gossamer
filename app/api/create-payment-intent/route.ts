import { stripe } from "@/utils/stripe";
import { createPayment } from "@/utils/supabase/server/payments";
import { createOrder } from "@/utils/supabase/server/orders";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { amount, userId, email, name, phone, address } = await req.json();

    if (!amount || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields: amount, userId, or email" },
        { status: 400 }
      );
    }

    // 1️⃣ Створюємо order (ще без оплати)
    const orderId = uuidv4();
    const { data: order, error: orderError } = await createOrder({
      id: orderId,
      user_id: userId,
      email,
      phone: phone || null,
      name: name || null,
      address: address || null,
      total: amount,
      status: "pending",
    });

    if (orderError || !order) {
      throw orderError || new Error("Failed to create order");
    }

    // 2️⃣ Створюємо PaymentIntent у Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: {
        user_id: userId,
        order_id: orderId,
      },
    });

    // 3️⃣ Зберігаємо запис у таблиці payments
    const { data: payment, error: paymentError } = await createPayment({
      amount: Math.round(amount * 100),
      user_id: userId,
      status: "pending",
      currency: "usd",
      order_id: orderId,
      stripe_payment_intent_id: paymentIntent.id,
    });

    if (paymentError || !payment) {
      throw paymentError || new Error("Failed to create payment record");
    }

    // 4️⃣ Повертаємо client secret для Stripe
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const err = error as Error;
    console.error("Create PaymentIntent error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
