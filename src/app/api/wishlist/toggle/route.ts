import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { toggleWishlistSchema } from '@/lib/validator/wishlist';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();

  // 1. Auth Check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { variantId } = toggleWishlistSchema.parse(body);

    // 2. Отримуємо або створюємо Wishlist ID
    let wishlistId: string;
    const { data: wishlist } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (wishlist) {
      wishlistId = wishlist.id;
    } else {
      const { data: newWishlist, error: createError } = await supabase
        .from('wishlists')
        .insert({ user_id: user.id })
        .select('id')
        .single();

      if (createError) throw new Error(createError.message);
      wishlistId = newWishlist.id;
    }

    // 3. Перевіряємо, чи є вже цей товар
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('wishlist_id', wishlistId)
      .eq('variant_id', variantId)
      .single();

    if (existingItem) {
      // --- ВИДАЛЕННЯ ---
      const { error } = await supabase.from('wishlist_items').delete().eq('id', existingItem.id);

      if (error) throw error;

      return NextResponse.json({ status: 'removed', variantId });
    } else {
      // --- ДОДАВАННЯ ---
      const { error } = await supabase.from('wishlist_items').insert({
        wishlist_id: wishlistId,
        variant_id: variantId,
      });

      if (error) throw error;

      return NextResponse.json({ status: 'added', variantId });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  }
}
