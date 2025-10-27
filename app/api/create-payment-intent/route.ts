// app/api/create-payment-intent/route.ts
import { supabaseBrowser } from '@/utils/supabase/supabaseBrowser';
import type { Database } from '@/types/supabase';

export async function POST(req: Request) {
  const { amount, userId } = await req.json();
  const supabase = supabaseBrowser();

  const { error } = await supabase
    .from('payments')
    .insert<Database['public']['Tables']['payments']['Insert']>({
      amount,
      user_id: userId,
      status: 'pending',
      currency: 'usd',
    });

  if (error) throw error;

  // ... создай PaymentIntent в Stripe
}