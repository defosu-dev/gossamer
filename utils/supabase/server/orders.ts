'use server';

import type { Database } from '@/types/supabase';

import { supabaseServer } from '../supabaseServer';

type OrderInsert = Omit<Database['public']['Tables']['orders']['Insert'], 'created_at'>;

/**
 * Server action: creates a new order record.
 *
 * @remarks
 * Used after successful payment (Stripe webhook or checkout completion).
 * Inserts order with all required fields (user_id, session_id, items, totals, etc.)
 * and returns the created row via `.select().single()`.
 *
 * @param data Order data without auto-generated `created_at`.
 * @returns Supabase insert response with the new order.
 */
export const createOrder = async (data: OrderInsert) => {
  const supabase = await supabaseServer();
  return supabase.from('orders').insert(data).select().single();
};
