// utils/supabase/client/wishlist.ts

import { supabaseBrowser } from "../supabaseBrowser";

/**
 * Fetches the user's wishlist from Supabase.
 * 
 * @param userId - The authenticated user's ID
 * @returns Promise resolving to an array of wishlist item IDs
 * @throws Error if fetch fails (except when wishlist doesn't exist - PGRST116)
 */
export const fetchWishlist = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabaseBrowser
    .from('wishlists')
    .select('items')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return (data?.items as string[]) || [];
};

/**
 * Updates the user's wishlist in Supabase.
 * 
 * Uses upsert to create the wishlist if it doesn't exist.
 * 
 * @param userId - The authenticated user's ID
 * @param items - Array of product IDs in the wishlist
 * @throws Error if update fails
 */
export const updateWishlist = async (userId: string, items: string[]) => {
  const { error } = await supabaseBrowser
    .from('wishlists')
    .upsert(
      {
        user_id: userId,
        items,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

  if (error) throw error;
};