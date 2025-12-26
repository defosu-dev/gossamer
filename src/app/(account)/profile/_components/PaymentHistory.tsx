'use client';

import Link from 'next/link';
import { Loader2, Package, ChevronRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useOrders } from '@/hooks/user';
import formatCurrency from '@/lib/utils/formatCurrency';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function PaymentHistory() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 w-full animate-pulse rounded-2xl bg-neutral-100" />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50 p-12 text-center">
        <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
          <Package className="size-8 text-neutral-300" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900">No orders yet</h3>
        <p className="mt-1 text-sm text-neutral-500">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:border-neutral-200 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-5">
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                <div>
                  <p className="text-xs text-neutral-500">Order Placed</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                    <Calendar className="size-3.5 text-neutral-400" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Total Amount</p>
                  <p className="mt-0.5 text-sm font-bold text-neutral-900">
                    {formatCurrency(order.total)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Order ID</p>
                  <p className="mt-0.5 rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600">
                    #{order.number}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase',
                  order.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {order.status === 'pending' && <Clock className="size-3" />}
                {order.status}
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 flex items-center justify-between">
              {/* Images Stack */}
              <div className="flex -space-x-4 pl-1">
                {order.items.slice(0, 4).map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative size-14 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:translate-x-1"
                    style={{ zIndex: 10 - idx }}
                  >
                    <ImageWithFallback
                      src={item.imageUrl ?? ''}
                      alt={item.productTitle}
                      className="object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div
                    className="relative flex size-14 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-xs font-bold text-neutral-600 shadow-sm ring-1 ring-black/5"
                    style={{ zIndex: 0 }}
                  >
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <Link
                href={`/order/${order.id}`}
                className="flex items-center gap-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600 hover:underline"
              >
                View Details
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
