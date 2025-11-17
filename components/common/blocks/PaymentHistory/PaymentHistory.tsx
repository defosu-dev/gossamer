// app/components/PaymentHistory.tsx
import { getUserPayments } from '@/utils/supabase/server/payments';

export default async function PaymentHistory() {
  const supabase = await import('@/utils/supabase/supabaseServer').then((m) => m.supabaseServer());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  const { data: payments, error } = await getUserPayments(user.id);

  if (error || !payments?.length) {
    return <p className="text-gray-500">No payments found</p>;
  }

  return (
    <ul className="space-y-3">
      {payments.map((p) => (
        <li key={p.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">
                ${(p.amount / 100).toFixed(2)} {(p.currency ?? 'USD').toUpperCase()}
              </span>
              <span className="ml-2 text-sm text-gray-600">— {p.status}</span>
            </div>
            <div className="text-right">
              <span className="block text-xs text-gray-400">
                {p.created_at ? new Date(p.created_at).toLocaleDateString('en-US') : '—'}
              </span>
              <span className="text-xs text-gray-400">Order: {p.order_id.slice(0, 8)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
