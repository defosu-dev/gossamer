import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { WishlistItemDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();

  // 1. Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Будуємо запит
  // 👇 ВИПРАВЛЕННЯ 1: Прибрали .single() звідси
  // 👇 ВИПРАВЛЕННЯ 2: Прибрали 'created_at' з wishlist_items, бо його немає в БД
  const queryBuilder = supabase
    .from('wishlists')
    .select(
      `
      id,
      wishlist_items (
        id,
        variant_id,
        product_variants (
          id,
          product_id,
          current_price,
          old_price,
          stock,
          deleted_at,
          products ( title, slug ),
          product_images ( url, position )
        )
      )
    `
    )
    .eq('user_id', user.id);

  // Тепер тип виведеться коректно (Array)
  type WishlistQueryResponse = QueryData<typeof queryBuilder>;

  // 👇 ВИПРАВЛЕННЯ 3: Викликаємо .single() тут
  const { data, error } = await queryBuilder.single();

  // Якщо вішліста ще немає - це ок, повертаємо пустий масив
  if (error && error.code === 'PGRST116') {
    return NextResponse.json([]);
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 👇 ВИПРАВЛЕННЯ 4: Беремо тип одного елемента масиву
  const wishlistRaw = data as WishlistQueryResponse[0];

  // 3. Трансформація
  const items: WishlistItemDTO[] = wishlistRaw.wishlist_items
    .filter((item) => item.product_variants && item.product_variants.deleted_at === null)
    .map((item) => {
      const variant = item.product_variants!;

      const productRaw = variant.products;
      const productData = Array.isArray(productRaw) ? productRaw[0] : productRaw;

      // Картинка
      const image =
        variant.product_images?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url ??
        null;

      return {
        id: item.id,
        variantId: variant.id,
        productId: variant.product_id!,
        title: productData?.title ?? 'Unknown',
        slug: productData?.slug ?? '',
        price: variant.current_price ?? 0,
        oldPrice: variant.old_price,
        imageUrl: image,
        inStock: (variant.stock ?? 0) > 0,
        addedAt: new Date().toISOString(),
      };
    });

  return NextResponse.json(items);
}
