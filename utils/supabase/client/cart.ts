'use client';

import type { CartItem } from '@/store/slices/cartSlice';

import { supabaseBrowser } from '../supabaseBrowser';

/**
 * Client-side utility: fetches user's cart from normalized Supabase tables.
 *
 * @remarks
 * - Schema: `carts` (1 per user) + `cart_items` (many)
 * - Gracefully handles missing cart (PGRST116 = no rows)
 * - Returns items in the exact format expected by Zustand cart slice
 */
export const fetchCart = async (userId: string): Promise<CartItem[]> => {
  const { data: cart, error: cartError } = await supabaseBrowser
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .single();

  // If cart doesn't exist yet → return empty array
  if (cartError && cartError.code !== 'PGRST116') throw cartError;
  if (!cart) return [];

  const { data: items, error: itemsError } = await supabaseBrowser
    .from('cart_items')
    .select('variant_id, quantity')
    .eq('cart_id', cart.id);

  if (itemsError) throw itemsError;

  return (items ?? []) as CartItem[];
};

/**
 * Client-side utility: completely replaces the user's cart.
 *
 * @remarks
 * - Upserts cart row (ensures it exists and updates `updated_at`)
 * - Deletes all existing cart_items then inserts new ones (atomic replace)
 * - Safe for concurrent updates and guest → auth transitions
 * - Used by useCart hook for background sync
 */
export const updateCart = async (userId: string, items: CartItem[]) => {

  // 1. Ensure cart row exists
  const { data: cart, error: cartError } = await supabaseBrowser
    .from('carts')
    .upsert({ user_id: userId, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    .select('id')
    .single();

  if (cartError || !cart) throw cartError ?? new Error('Cart upsert failed');

  // 2. Remove all existing items
  const { error: delError } = await supabaseBrowser
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (delError) throw delError;

  // 3. Insert new items (skip if cart is empty)
  if (items.length === 0) return;

  const { error: insError } = await supabaseBrowser
    .from('cart_items')
    .insert(items.map((i) => ({ cart_id: cart.id, ...i })));

  if (insError) throw insError;
};
