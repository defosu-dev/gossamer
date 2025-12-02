import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { OrderDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15: params це Promise
) {
  const { id } = await params;
  const supabase = await supabaseServer();

  // 1. Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Будуємо запит
  const queryBuilder = supabase
    .from('orders')
    .select(
      `
      id,
      total,
      status,
      created_at,
      email,
      name,
      address,
      phone,
      order_items (
        id,
        quantity,
        price,
        product_variants (
          name,
          products ( title ),
          product_images ( url, position )
        )
      )
    `
    )
    .eq('id', id)
    .eq('user_id', user.id) // 🔒 ВАЖЛИВО: Юзер може бачити тільки свої замовлення
    .single();

  type OrderQueryResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder;

  // Обробка "не знайдено" (або чуже замовлення)
  if (error && error.code === 'PGRST116') {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const orderRaw = data as OrderQueryResponse;

  // 3. Трансформація в DTO
  // Використовуємо '??' для обробки null значень з бази
  const createdDate = orderRaw.created_at ?? new Date().toISOString();

  const orderDTO: OrderDTO = {
    id: orderRaw.id,
    number: new Date(createdDate).getTime(), // Фейковий номер
    status: orderRaw.status as OrderDTO['status'],
    total: orderRaw.total ?? 0,
    createdAt: createdDate,
    shipping: {
      name: orderRaw.name ?? '',
      address: orderRaw.address ?? '',
      email: orderRaw.email,
      phone: orderRaw.phone ?? null,
    },
    items: orderRaw.order_items.map((item) => {
      const variant = item.product_variants!;

      // Безпечне отримання назви (захист від масиву/об'єкту)
      // @ts-ignore
      const productData = variant.products;
      const productTitle = Array.isArray(productData) ? productData[0]?.title : productData?.title;

      const image =
        variant.product_images?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ??
        null;

      return {
        id: item.id,
        productTitle: productTitle ?? 'Unknown Product',
        variantName: variant.name,
        price: item.price ?? 0,
        quantity: item.quantity ?? 1,
        imageUrl: image,
      };
    }),
  };

  return NextResponse.json(orderDTO);
}
