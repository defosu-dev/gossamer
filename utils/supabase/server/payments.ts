import type { Database } from '@/types/supabase';
import { supabaseServer } from '../supabaseServer';

type PaymentInsert = Omit<Database['public']['Tables']['payments']['Insert'], 'id' | 'created_at'>;

export const createPayment = async (data: PaymentInsert) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').insert(data).select().single();
};

export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'succeeded' | 'failed'
) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').update({ status }).eq('id', paymentId);
};

export const updatePaymentStatusByOrderId = async (
  orderId: string,
  status: 'succeeded' | 'failed'
) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').update({ status }).eq('order_id', orderId);
};

export const getUserPayments = async (userId: string, sessionId?: string) => {
  const supabase = await supabaseServer();

  let query = supabase
    .from('payments')
    .select('id, amount, currency, status, created_at, stripe_payment_intent_id, order_id');

  if (sessionId) {
    query = query.or(`user_id.eq.${userId},session_id.eq.${sessionId}`);
  } else {
    query = query.eq('user_id', userId);
  }

  return query.order('created_at', { ascending: false });
};
