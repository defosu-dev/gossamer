import { getUserPayments } from '@/utils/supabase/server/payments';
import { cn } from '@/utils/cn';

/**
 * PaymentHistory.
 *
 * Displays a list of payments made by the current authenticated user.
 *
 * @remarks
 * - Fetches user from Supabase server-side auth.
 * - Shows error message if user is unauthorized.
 * - Renders a fallback message if no payments exist.
 * - Formats amount in USD by default.
 */
export default async function PaymentHistory() {
  const supabase = await import('@/utils/supabase/supabaseServer').then((m) => m.supabaseServer());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className={cn('text-red-500')}>Unauthorized</p>;
  }

  const { data: payments, error } = await getUserPayments(user.id);

  if (error || !payments?.length) {
    return <p className={cn('text-gray-500')}>No payments found</p>;
  }

  return (
    <ul className={cn('space-y-3')}>
      {payments.map((p) => (
        <li
          key={p.id}
          className={cn('rounded-lg border bg-white p-4 shadow-sm', 'transition hover:shadow-md')}
        >
          <div className={cn('flex items-center justify-between')}>
            <div>
              <span className={cn('font-medium')}>
                ${(p.amount / 100).toFixed(2)} {(p.currency ?? 'USD').toUpperCase()}
              </span>
              <span className={cn('ml-2 text-sm text-gray-600')}>— {p.status}</span>
            </div>
            <div className={cn('text-right')}>
              <span className={cn('block text-xs text-gray-400')}>
                {p.created_at != null ? new Date(p.created_at).toLocaleDateString('en-US') : '—'}
              </span>
              <span className={cn('text-xs text-gray-400')}>Order: {p.order_id.slice(0, 8)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
