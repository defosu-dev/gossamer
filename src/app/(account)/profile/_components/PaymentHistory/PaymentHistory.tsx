'use client';

import { Loader2, Package } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useOrders } from '@/hooks/user';
import formatCurrency from '@/lib/utils/formatCurrency';

/**
 * PaymentHistory (Orders History).
 *
 * Displays a list of user orders fetched via TanStack Query.
 */
export default function PaymentHistory() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load history</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8 text-center">
        <Package className="mb-2 h-8 w-8 text-gray-300" />
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order.id}
            className={cn(
              'rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md',
              'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
            )}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{formatCurrency(order.total)}</span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase',
                    order.status === 'paid' && 'bg-green-100 text-green-700',
                    order.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                    order.status === 'cancelled' && 'bg-red-100 text-red-700'
                  )}
                >
                  {order.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="text-right text-xs text-gray-400">
              <p>ID: {order.id.slice(0, 8)}...</p>
              <p>{order.items.length} item(s)</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
