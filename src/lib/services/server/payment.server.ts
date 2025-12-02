import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { Database } from '@/types/db';

type PaymentInsert = Omit<Database['public']['Tables']['payments']['Insert'], 'id' | 'created_at'>;

/**
 * Server action: creates a new payment record.
 *
 * @remarks
 * Used after Stripe Checkout session creation or when initializing a payment.
 * Returns the inserted row with select().
 */
export const createPayment = async (data: PaymentInsert) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').insert(data).select().single();
};

/**
 * Server action: updates payment status by payment ID.
 *
 * @remarks
 * Typically used in Stripe webhook handling (payment_intent.succeeded/failed).
 */
export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'succeeded' | 'failed'
) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').update({ status }).eq('id', paymentId);
};

/**
 * Server action: updates payment status using the related order ID.
 *
 * @remarks
 * Useful when you only have the order reference (e.g. from email or admin panel).
 */
export const updatePaymentStatusByOrderId = async (
  orderId: string,
  status: 'succeeded' | 'failed'
) => {
  const supabase = await supabaseServer();
  return supabase.from('payments').update({ status }).eq('order_id', orderId);
};
