import type { QueryData } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';
import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { OrderDTO } from '@/types/api';

const ORDER_SELECT_QUERY = `
  id, total, status, created_at, email, name, address, phone,
  order_items (
    id, quantity, price,
    product_variants (
      name,
      products ( title, slug ),
      product_images ( url, position )
    )
  )
`;

/**
 * Retrieves a specific order by ID.
 *
 * @remarks
 * - Authenticated users can view their own orders via standard RLS.
 * - Guest users can view orders if they provide a matching 'email' query parameter (bypassing RLS via Admin client).
 *
 * @param request The NextRequest object containing query parameters.
 * @param params The route parameters containing the order ID.
 * @returns JSON response with the OrderDTO or an error.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);
  const emailParam = searchParams.get('email');

  const supabaseAuth = await supabaseServer();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  let queryBuilder;

  if (user) {
    queryBuilder = supabaseAuth
      .from('orders')
      .select(ORDER_SELECT_QUERY)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
  }
  else if (emailParam !== null && emailParam !== '') {
    const { SUPABASE_SERVICE_ROLE_KEY } = process.env;

    if (SUPABASE_SERVICE_ROLE_KEY === undefined || SUPABASE_SERVICE_ROLE_KEY === '') {
      Error('SERVER ERROR: Missing SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    queryBuilder = supabaseAdmin
      .from('orders')
      .select(ORDER_SELECT_QUERY)
      .eq('id', id)
      .ilike('email', emailParam)
      .single();
  }
  else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  type OrderQueryResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder;

  if (error !== null || data === null) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const orderRaw = data as OrderQueryResponse;
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
      const variant = item.product_variants!;

      const productData = variant.products;
      const productTitle = Array.isArray(productData) ? productData[0]?.title : productData?.title;
      const productSlug = Array.isArray(productData) ? productData[0]?.slug : productData?.slug;

      const image =
        variant.product_images?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ??
        null;

      return {
        id: item.id,
        productTitle: productTitle ?? 'Unknown Product',
        productSlug: productSlug ?? '#',
        variantName: variant.name,
        price: item.price ?? 0,
        quantity: item.quantity ?? 1,
        imageUrl: image,
      };
    }),
  };

  return NextResponse.json(orderDTO);
}