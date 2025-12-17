import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { ProductCardDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const queryBuilder = supabase
    .from('wishlists')
    .select(`
      id,
      wishlist_items (
        variant_id,
        product_variants (
          id,
          current_price,
          old_price,
          stock,
          deleted_at,
          product_images ( url, position ),
          products (
            id, 
            title, 
            slug, 
            description, 
            average_rating, 
            reviews_count,
            categories ( name, slug )
          )
        )
      )
    `)
    .eq('user_id', user.id);

  type WishlistQueryResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder.single();

  if (error && error.code === 'PGRST116') {
    return NextResponse.json([]); 
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const wishlistRaw = data as WishlistQueryResponse[0];

  const products: ProductCardDTO[] = wishlistRaw.wishlist_items
    .filter((item) => item.product_variants && item.product_variants.deleted_at === null)
    .map((item) => {
      const variant = item.product_variants!;
      
      const productRaw = variant.products;
      const product = Array.isArray(productRaw) ? productRaw[0] : productRaw;
      
      const categoryRaw = product.categories;
      const category = Array.isArray(categoryRaw) ? categoryRaw[0] : categoryRaw;

      const imageUrl = variant.product_images
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ?? null;

      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        rating: product.average_rating ?? 0,
        reviewsCount: product.reviews_count ?? 0,
        category: category ? { name: category.name, slug: category.slug } : null,
        
        price: variant.current_price ?? 0,
        oldPrice: variant.old_price,
        imageUrl: imageUrl,
        defaultVariantId: variant.id, 
      };
    });

  return NextResponse.json(products);
}