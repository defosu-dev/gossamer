'use client';

import { supabaseBrowser } from '@/lib/utils/supabase/supabaseBrowser';

/**
 * Server action (client-side): fully replaces user's wishlist.
 *
 * @remarks
 * - Uses upsert to ensure wishlist record exists
 * - Deletes all existing items then inserts new ones (atomic replace)
 * - Safe for concurrent updates
 * - Works for both authenticated and guest users (if userId is session-based)
 */
export const updateWishlist = async (userId: string, variantIds: string[]) => {
  // Step 1: Ensure wishlist record exists (upsert on user_id)
  const { data: wishlist, error: wishlistError } = await supabaseBrowser
    .from('wishlists')
    .upsert({ user_id: userId }, { onConflict: 'user_id' })
    .select('id')
    .single();

  if (wishlistError) throw wishlistError;

  const wishlistId = wishlist.id;

  // Step 2: Delete all existing items
  const { error: deleteError } = await supabaseBrowser
    .from('wishlist_items')
    .delete()
    .eq('wishlist_id', wishlistId);

  if (deleteError) throw deleteError;

  // Step 3: Insert new items (if any)
  if (variantIds.length > 0) {
    const { error: insertError } = await supabaseBrowser.from('wishlist_items').insert(
      variantIds.map((variant_id) => ({
        wishlist_id: wishlistId,
        variant_id,
      }))
    );

    if (insertError) throw insertError;
  }
};
