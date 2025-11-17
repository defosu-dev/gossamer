import { supabaseBrowser } from '../supabaseBrowser';

export const getUserPaymentsClient = async (userId: string) => {
  return supabaseBrowser
    .from('payments')
    .select('id, amount, currency, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};
