'use client';

import { supabaseBrowser } from '../supabaseBrowser';

/**
 * Client-side utility: fetches authenticated user’s payment history.
 *
 * @remarks
 * - Uses `supabaseBrowser` → must be called only in client components or hooks
 * - Returns payments ordered by creation date (newest first)
 * - Selects only fields needed for UI (id, amount, currency, status, date)
 * - No server-side pagination — suitable for personal payment history (usually < 100 rows)
 */
export const getUserPaymentsClient = async (userId: string) => {
  return supabaseBrowser
    .from('payments')
    .select('id, amount, currency, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};
