import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { ProductCardDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.max(1, parseInt(searchParams.get('limit') || '12'));
  const categorySlug = searchParams.get('category');
  const sort = searchParams.get('sort');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const queryBuilder = supabase
    .from('products')
    .select(
      `
      id, title, slug, description, average_rating, reviews_count, created_at,
      categories!inner ( id, name, slug ),
      product_variants (
        id,
        current_price, old_price, stock,
        product_images ( url, position )
      )
    `
    )
    .is('deleted_at', null);

  type DbResultType = QueryData<typeof queryBuilder>;

  if (categorySlug) {
    queryBuilder.eq('categories.slug', categorySlug);
  }

  switch (sort) {
    case 'rating_desc':
      queryBuilder.order('average_rating', { ascending: false });
      break;
    case 'title_asc':
      queryBuilder.order('title', { ascending: true });
      break;
    case 'newest':
    default:
      queryBuilder.order('created_at', { ascending: false });
      break;
  }

  const { data, error, count } = await queryBuilder.range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const products: ProductCardDTO[] = (data as DbResultType).map((item) => {
    const firstVariant = Array.isArray(item.product_variants) ? item.product_variants[0] : null;

    let imageUrl: string | null = null;
    if (
      firstVariant &&
      Array.isArray(firstVariant.product_images) &&
      firstVariant.product_images.length > 0
    ) {
      const sortedImages = [...firstVariant.product_images].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0)
      );
      imageUrl = sortedImages[0].url;
    }

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      rating: item.average_rating ?? 0,
      reviewsCount: item.reviews_count ?? 0,
      category: Array.isArray(item.categories) ? item.categories[0] : (item.categories as any),
      price: firstVariant?.current_price ?? 0,
      oldPrice: firstVariant?.old_price ?? null,
      imageUrl: imageUrl,
      defaultVariantId: firstVariant?.id, 
    };
  });

  return NextResponse.json({
    data: products,
    meta: {
      page,
      limit,
      total: count || 0,
      totalPages: count ? Math.ceil(count / limit) : 0,
    },
  });
}
