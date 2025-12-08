import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { initCheckoutSchema } from '@/lib/validator/checkout';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

export async function POST(request: NextRequest) {
  // Клієнт для читання сесії (з куками)
  const supabaseAuthClient = await supabaseServer();

  // 1. Визначаємо, хто робить запит
  const {
    data: { user },
  } = await supabaseAuthClient.auth.getUser();

  try {
    const body = await request.json();
    const { email, name, phone, address, items: guestItems } = initCheckoutSchema.parse(body);

    let checkoutItems: { variant_id: string; quantity: number; price: number }[] = [];

    // ==========================================
    // СЦЕНАРІЙ А: АВТОРИЗОВАНИЙ (Беремо з БД)
    // ==========================================
    if (user) {
      const { data: cart } = await supabaseAdmin
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!cart) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
      }

      const { data: dbItems, error: cartError } = await supabaseAdmin
        .from('cart_items')
        .select(
          `
          quantity,
          product_variants (
            id,
            current_price,
            stock,
            products ( title )
          )
        `
        )
        .eq('cart_id', cart.id);

      if (cartError || !dbItems || dbItems.length === 0) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
      }

      checkoutItems = dbItems.map((item) => {
        const variant = item.product_variants!;
        // Безпечне приведення
        const quantity = item.quantity ?? 1;

        // Перевірка стоку
        if ((variant.stock ?? 0) < quantity) {
          // @ts-ignore
          const title = Array.isArray(variant.products)
            ? variant.products[0]?.title
            : variant.products?.title;
          throw new Error(`Insufficient stock for ${title ?? 'product'}`);
        }

        return {
          variant_id: variant.id,
          quantity: quantity,
          price: Number(variant.current_price),
        };
      });
    }

    // ==========================================
    // СЦЕНАРІЙ Б: ГІСТЬ (Беремо з Request Body)
    // ==========================================
    else {
      if (!guestItems || guestItems.length === 0) {
        return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
      }

      const variantIds = guestItems.map((i) => i.variantId);

      // Перевіряємо ціни через Admin клієнт (ігноруємо RLS public read, хоча він і так відкритий)
      const { data: dbVariants, error: variantsError } = await supabaseAdmin
        .from('product_variants')
        .select(
          `
          id,
          current_price,
          stock,
          products ( title )
        `
        )
        .in('id', variantIds);

      if (variantsError || !dbVariants) {
        throw new Error('Failed to validate items');
      }

      const dbVariantsMap = new Map(dbVariants.map((v) => [v.id, v]));

      checkoutItems = guestItems.map((gItem) => {
        const variant = dbVariantsMap.get(gItem.variantId);

        if (!variant) {
          throw new Error(`Product variant ${gItem.variantId} not found`);
        }

        if ((variant.stock ?? 0) < gItem.quantity) {
          // @ts-ignore
          const title = Array.isArray(variant.products)
            ? variant.products[0]?.title
            : variant.products?.title;
          throw new Error(`Insufficient stock for ${title ?? 'product'}`);
        }

        return {
          variant_id: variant.id,
          quantity: gItem.quantity,
          price: Number(variant.current_price),
        };
      });
    }

    // ==========================================
    // СТВОРЕННЯ ЗАМОВЛЕННЯ (Через Admin Client)
    // ==========================================

    const totalAmount = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 🔴 ВИКОРИСТОВУЄМО supabaseAdmin ДЛЯ ЗАПИСУ
    // Це дозволяє гостям створювати замовлення попри RLS політики
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: user?.id || null, // null для гостя
        email,
        name,
        phone,
        address,
        total: totalAmount,
        status: 'pending',
      })
      .select('id')
      .single();

    if (orderError) throw new Error(orderError.message);

    const orderItemsInsert = checkoutItems.map((i) => ({
      order_id: order.id,
      variant_id: i.variant_id,
      quantity: i.quantity,
      price: i.price,
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItemsInsert);

    if (itemsError) throw new Error(itemsError.message);

    // 4. Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: {
        orderId: order.id,
        // Для гостя пишемо 'guest', щоб webhook не впав при перевірці
        userId: user?.id || 'guest',
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Checkout Init Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
