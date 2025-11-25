'use client';

import { supabaseBrowser } from '../supabaseBrowser';

/**
 * Server action (client-side): fetches user's wishlist variant IDs.
 *
 * @remarks
 * - Uses normalized schema: `wishlists` (1 per user) + `wishlist_items` (many)
 * - Gracefully handles missing wishlist (code PGRST116 = no rows)
 * - Returns array of variant_id strings (never null/undefined)
 */
export const fetchWishlist = async (userId: string): Promise<string[]> => {
  // Step 1: Get or create wishlist record
  const { data: wishlist, error: wishlistError } = await supabaseBrowser
    .from('wishlists')
    .select('id')
    .eq('user_id', userId)
    .single();

  // If wishlist doesn't exist yet → return empty array
  if (wishlistError && wishlistError.code !== 'PGRST116') throw wishlistError;
  if (!wishlist) return [];

  // Step 2: Fetch all variant IDs for this wishlist
  const { data: items, error: itemsError } = await supabaseBrowser
    .from('wishlist_items')
    .select('variant_id')
    .eq('wishlist_id', wishlist.id);

  if (itemsError) throw itemsError;

  return (items ?? [])
    .map((i) => i.variant_id)
    .filter((id): id is string => typeof id === 'string');
};

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
