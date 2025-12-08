import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { syncCartSchema } from '@/lib/validator/cart';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { PostgrestError } from '@supabase/supabase-js';
import type { Database } from '@/types/db';

// Використовуємо згенерований тип для вставки, щоб гарантувати правильні поля
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert'];

export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items: guestItems } = syncCartSchema.parse(body);

    if (guestItems.length === 0) {
      return NextResponse.json({ success: true });
    }

    // 1. Знаходимо або створюємо кошик
    let cartId: string;
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (cart) {
      cartId = cart.id;
    } else {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select('id')
        .single();

      if (createError) throw new Error(createError.message);
      cartId = newCart.id;
    }

    // 2. Отримуємо існуючі товари
    const { data: dbItems } = await supabase
      .from('cart_items')
      .select('id, variant_id, quantity')
      .eq('cart_id', cartId);

    const dbItemsMap = new Map(dbItems?.map((i) => [i.variant_id, i]));

    // 3. Підготовка операцій
    const itemsToInsert: CartItemInsert[] = [];

    // Ми кажемо, що це масив промісів (PromiseLike), які повертають об'єкт з можливим error.
    // Всі методи Supabase (insert, update) задовольняють цей інтерфейс.
    const dbOperations: PromiseLike<{ error: PostgrestError | null }>[] = [];

    for (const guestItem of guestItems) {
      const dbItem = dbItemsMap.get(guestItem.variantId);

      if (dbItem) {
        // UPDATE
        const currentDbQty = dbItem.quantity ?? 0;
        const newQuantity = currentDbQty + guestItem.quantity;

        dbOperations.push(
          supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', dbItem.id)
        );
      } else {
        // INSERT (збираємо в масив)
        itemsToInsert.push({
          cart_id: cartId,
          variant_id: guestItem.variantId,
          quantity: guestItem.quantity,
        });
      }
    }

    // 4. Додаємо операцію INSERT в загальний пул (якщо є що вставляти)
    if (itemsToInsert.length > 0) {
      dbOperations.push(supabase.from('cart_items').insert(itemsToInsert));
    }

    // 5. Виконання
    // Promise.all тепер не буде сваритися, бо всі елементи масиву відповідають PromiseLike<{ error: ... }>
    const results = await Promise.all(dbOperations);

    // 6. Перевірка помилок
    const firstError = results.find((res) => res.error)?.error;

    if (firstError) {
      console.error('Partial Sync Error:', firstError);
      throw new Error('Some items failed to sync');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Cart Sync Error:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}