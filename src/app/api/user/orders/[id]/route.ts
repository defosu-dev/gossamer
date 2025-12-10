import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { OrderDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const queryBuilder = supabase
    .from('orders')
    .select(`
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
          products ( title, slug ),
          product_images ( url, position )
        )
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id) 
    .single();

  type OrderResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder;

  if (error) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const orderRaw = data as OrderResponse;
  const createdDate = orderRaw.created_at ?? new Date().toISOString();

  const orderDTO: OrderDTO = {
    id: orderRaw.id,
    number: new Date(createdDate).getTime(),
    status: (orderRaw.status as OrderDTO['status']) ?? 'pending',
    total: orderRaw.total ?? 0,
    createdAt: createdDate,
    shipping: {
      name: orderRaw.name ?? '',
      address: orderRaw.address ?? '',
      email: orderRaw.email,
      phone: orderRaw.phone ?? null,
    },
    items: orderRaw.order_items.map((item) => {
      const variant = item.product_variants;
      
      const productData = variant?.products;
      const productTitle = Array.isArray(productData) ? productData[0]?.title : productData?.title;
      const productSlug = Array.isArray(productData) ? productData[0]?.slug : productData?.slug;

      const image = variant?.product_images
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ?? null;

      return {
        id: item.id,
        productTitle: productTitle ?? 'Product Unavailable',
        productSlug: productSlug ?? '#',
        variantName: variant?.name ?? null,
        price: item.price ?? 0,
        quantity: item.quantity ?? 1,
        imageUrl: image,
      };
    }),
  };

  return NextResponse.json(orderDTO);
}