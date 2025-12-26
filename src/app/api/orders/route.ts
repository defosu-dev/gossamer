import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { OrderDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  type OrdersQueryResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ordersRaw = data as OrdersQueryResponse;

  const orders: OrderDTO[] = ordersRaw.map((order) => {
    const createdDate = order.created_at ?? new Date().toISOString();

    return {
      id: order.id,
      number: new Date(createdDate).getTime(),
      status: order.status as OrderDTO['status'],
      total: order.total ?? 0,
      createdAt: createdDate, // Тепер це точно string
      shipping: {
        name: order.name ?? '',
        address: order.address ?? '',
        email: order.email,
        phone: order.phone ?? null,
      },
      items: order.order_items.map((item) => {
        const variant = item.product_variants!;

        const productData = variant.products;
        const productTitle = Array.isArray(productData)
          ? productData[0]?.title
          : productData?.title;

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
  });

  return NextResponse.json(orders);
}
