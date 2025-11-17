import { CartItem } from '@/store/slices/cartSlice';
import { supabaseBrowser } from '../supabaseBrowser';

/** Fetch cart items */
export const fetchCart = async (userId: string): Promise<CartItem[]> => {
  const { data: cart, error: cartError } = await supabaseBrowser
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (cartError && cartError.code !== 'PGRST116') throw cartError;
  if (!cart) return [];

  const { data: items, error: itemsError } = await supabaseBrowser
    .from('cart_items')
    .select('variant_id, quantity')
    .eq('cart_id', cart.id);

  if (itemsError) throw itemsError;
  return items as CartItem[];
};

/** Replace the whole cart */
export const updateCart = async (userId: string, items: CartItem[]) => {
  // 1. Upsert the cart row
  const { data: cart, error: cartError } = await supabaseBrowser
    .from('carts')
    .upsert({ user_id: userId, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    .select()
    .single();

  if (cartError || !cart) throw cartError ?? new Error('Cart upsert failed');

  // 2. Delete old items
  const { error: delError } = await supabaseBrowser
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);
  if (delError) throw delError;

  // 3. Insert new items (if any)
  if (items.length === 0) return;

  const { error: insError } = await supabaseBrowser
    .from('cart_items')
    .insert(items.map((i) => ({ cart_id: cart.id, ...i })));

  if (insError) throw insError;
};
