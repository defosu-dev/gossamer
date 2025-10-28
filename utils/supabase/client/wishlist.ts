import { supabaseBrowser } from "../supabaseBrowser";

/**
 * ===============================================================
 * Wishlist Supabase Client Utilities
 * ===============================================================
 *
 * Handles fetching and updating the user's wishlist data stored
 * across two related tables:
 *
 *  - wishlists (one per user)
 *  - wishlist_items (contains variant_id references)
 *
 * The wishlist itself does not store an array of items; instead,
 * each item is represented as a row in `wishlist_items` that links
 * a `wishlist_id` to a `variant_id`.
 */

/**
 * Fetches the user's wishlist from Supabase.
 *
 * 1. Finds the wishlist ID for the given user.
 * 2. Queries all variant IDs from `wishlist_items` for that wishlist.
 *
 * @param userId - The authenticated user's ID
 * @returns Promise resolving to an array of product variant IDs
 * @throws Error if database queries fail (except for missing wishlist)
 */
export const fetchWishlist = async (userId: string): Promise<string[]> => {
  // Step 1: Fetch the wishlist record for this user
  const { data: wishlist, error: wishlistError } = await supabaseBrowser
    .from("wishlists")
    .select("id")
    .eq("user_id", userId)
    .single();

  // If an error occurs (other than "not found" - PGRST116), throw it
  if (wishlistError && wishlistError.code !== "PGRST116") throw wishlistError;

  // If no wishlist exists yet, return an empty array
  if (!wishlist) return [];

  // Step 2: Fetch all variant IDs from wishlist_items for this wishlist
  const { data: items, error: itemsError } = await supabaseBrowser
    .from("wishlist_items")
    .select("variant_id")
    .eq("wishlist_id", wishlist.id);

  if (itemsError) throw itemsError;

  // Filter out nulls and ensure the result is strictly string[]
  return (items ?? [])
    .map((i) => i.variant_id)
    .filter((id): id is string => typeof id === "string");
};

/**
 * Updates the user's wishlist in Supabase.
 *
 * Uses the following approach:
 * 1. Ensures a wishlist record exists (via upsert).
 * 2. Deletes all existing wishlist_items for that wishlist.
 * 3. Inserts the provided variant IDs as new wishlist_items.
 *
 * This approach guarantees the wishlist is always in sync
 * with the provided variant list.
 *
 * @param userId - The authenticated user's ID
 * @param variantIds - Array of product variant IDs to store in wishlist
 * @throws Error if any database operation fails
 */
export const updateWishlist = async (userId: string, variantIds: string[]) => {
  // Step 1: Ensure wishlist exists or create it
  const { data: wishlist, error: wishlistError } = await supabaseBrowser
    .from("wishlists")
    .upsert({ user_id: userId }, { onConflict: "user_id" })
    .select("id")
    .single();

  if (wishlistError) throw wishlistError;

  const wishlistId = wishlist.id;

  // Step 2: Remove existing wishlist items for this user
  const { error: deleteError } = await supabaseBrowser
    .from("wishlist_items")
    .delete()
    .eq("wishlist_id", wishlistId);

  if (deleteError) throw deleteError;

  // Step 3: Insert the new wishlist items
  if (variantIds.length > 0) {
    const { error: insertError } = await supabaseBrowser
      .from("wishlist_items")
      .insert(
        variantIds.map((variant_id) => ({
          wishlist_id: wishlistId,
          variant_id,
        }))
      );

    if (insertError) throw insertError;
  }
};
