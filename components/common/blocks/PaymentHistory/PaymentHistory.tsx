// app/components/PaymentHistory.tsx
import { supabaseServer } from '@/utils/supabase/supabaseServer';
import type { Database } from '@/lib/supabase';

type Payment = Database['public']['Tables']['payments']['Row'];

export default async function PaymentHistory() {
  const supabase = await supabaseServer();

  // 1. Отримуємо користувача
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return <p className="text-red-500">Не авторизований</p>;
  }

  const userId = user.id;

  // 2. Отримуємо платежі
  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('id, amount, currency, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (paymentsError) {
    return <p className="text-red-500">Помилка завантаження платежів</p>;
  }

  if (!payments || payments.length === 0) {
    return <p className="text-gray-500">Платежів не знайдено</p>;
  }

  return (
    <ul className="space-y-3">
      {payments.map((payment) => (
        <li
          key={payment.id}
          className="p-4 border rounded-lg bg-white shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">
                {payment.amount} {payment.currency}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                — {payment.status}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {payment.created_at
                ? new Date(payment.created_at).toLocaleDateString('uk-UA')
                : '—'}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}