import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { addToCartSchema, removeCartItemSchema, updateCartItemSchema } from '@/lib/validator/cart';
import type { CartDTO, CartItemDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ==============================================================================
// 1. GET: Отримати кошик користувача
// ==============================================================================
export async function GET() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const queryBuilder = supabase
    .from('carts')
    .select(
      `
      id,
      cart_items (
        id,
        quantity,
        variant_id,
        product_variants (
          id,
          product_id,
          current_price,
          old_price,
          stock,
          deleted_at,
          products ( title, slug ),
          product_images ( url, position ),
          product_variant_attributes (
            attribute_values ( value, attributes ( name ) )
          )
        )
      )
    `
    )
    .eq('user_id', user.id)
    .order('id', { referencedTable: 'cart_items', ascending: true });

  type CartQueryResponse = QueryData<typeof queryBuilder>;

  // maybeSingle() не кидає помилку, якщо запису немає, а повертає null
  const { data, error } = await queryBuilder.maybeSingle();

  if (error) {
    console.error('GET Cart Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Якщо кошика немає - повертаємо пусту структуру
  if (!data) {
    return NextResponse.json({
      id: '',
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    } as CartDTO);
  }

  const cartRaw = data as CartQueryResponse[0];

  const items: CartItemDTO[] = cartRaw.cart_items
    .filter((item) => item.product_variants && item.product_variants.deleted_at === null)
    .map((item) => {
      const variant = item.product_variants!;
      const product = variant.products!;
      const firstVariant = Array.isArray(item.product_variants) ? item.product_variants[0] : null;
      const image =
        variant.product_images?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ??
        null;

      const attributesDesc = variant.product_variant_attributes
        .map((pva) => `${pva.attribute_values?.attributes?.name}: ${pva.attribute_values?.value}`)
        .join(', ');

      return {
        id: item.id,
        variantId: variant.id,
        productId: variant.product_id!,
        title: product.title,
        slug: product.slug,
        price: variant.current_price ?? 0,
        oldPrice: variant.old_price,
        quantity: item.quantity ?? 1,
        stock: variant.stock ?? 0,
        imageUrl: image,
        attributesDescription: attributesDesc,
        defaultVariantId: firstVariant?.id,
      };
    });

  const cartDTO: CartDTO = {
    id: cartRaw.id,
    items,
    totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    totalQuantity: items.reduce((acc, item) => acc + item.quantity, 0),
  };

  return NextResponse.json(cartDTO);
}

// ==============================================================================
// 2. POST: Додати товар (Add to Cart)
// ==============================================================================
export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { variantId, quantity } = addToCartSchema.parse(body);

    // 1. Знаходимо або створюємо кошик
    let cartId: string;

    // maybeSingle безпечніший
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (cart) {
      cartId = cart.id;
    } else {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select('id')
        .single();

      if (createError) throw new Error(`Create cart error: ${createError.message}`);
      cartId = newCart.id;
    }

    // 2. Перевіряємо, чи є вже цей товар в кошику
    // Використовуємо maybeSingle(), щоб не отримувати помилку PGRST116, якщо товару немає
    const { data: existingItem, error: fetchItemError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('variant_id', variantId)
      .maybeSingle();

    if (fetchItemError) {
      throw new Error(`Fetch item error: ${fetchItemError.message}`);
    }

    if (existingItem) {
      // Оновлюємо кількість
      const currentQty = existingItem.quantity ?? 0;
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: currentQty + quantity })
        .eq('id', existingItem.id);

      if (error) throw new Error(`Update item error: ${error.message}`);
    } else {
      // Додаємо новий
      const { error } = await supabase
        .from('cart_items')
        .insert({ cart_id: cartId, variant_id: variantId, quantity });

      if (error) throw new Error(`Insert item error: ${error.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    // 👇 ЛОГУВАННЯ ПОМИЛКИ В ТЕРМІНАЛ
    // Це допоможе вам побачити реальну причину 500 помилки
    console.error('POST /api/cart Error:', error);

    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

// ==============================================================================
// 3. PATCH: Оновити кількість (Update Quantity)
// ==============================================================================
export async function PATCH(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { itemId, quantity } = updateCartItemSchema.parse(body);

    const { error } = await supabase.from('cart_items').update({ quantity }).eq('id', itemId);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('PATCH /api/cart Error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// ==============================================================================
// 4. DELETE: Видалити товар
// ==============================================================================
export async function DELETE(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { itemId } = removeCartItemSchema.parse(body);

    const { error } = await supabase.from('cart_items').delete().eq('id', itemId);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('DELETE /api/cart Error:', error);
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}
