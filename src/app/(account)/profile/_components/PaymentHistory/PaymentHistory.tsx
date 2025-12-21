'use client';

import { Loader2, Package, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useOrders } from '@/hooks/user';
import formatCurrency from '@/lib/utils/formatCurrency';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function PaymentHistory() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading)
    return (
      <div className="py-10 text-center">
        <Loader2 className="mx-auto size-6 animate-spin text-neutral-300" />
      </div>
    );

  if (!orders?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 p-12 text-center">
        <div className="mb-4 rounded-full bg-neutral-50 p-4">
          <Package className="size-8 text-neutral-300" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">No orders yet</h3>
        <p className="mt-1 text-sm text-neutral-500">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:border-neutral-200 hover:shadow-md"
          >
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-50 pb-4">
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-neutral-500">Order Placed</p>
                  <p className="font-medium text-neutral-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500">Total</p>
                  <p className="font-medium text-neutral-900">{formatCurrency(order.total)}</p>
                </div>
                <div>
                  <p className="text-neutral-500">Order ID</p>
                  <p className="font-medium text-neutral-900">#{order.number}</p>
                </div>
              </div>

              <span
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase',
                  order.status === 'paid'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {order.status}
              </span>
            </div>

            {/* Items Preview */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3 overflow-hidden py-1">
                {order.items.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="relative size-12 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm"
                  >
                    <ImageWithFallback
                      src={item.imageUrl ?? ''}
                      alt={item.productTitle}
                      className="object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="relative flex size-12 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-xs font-medium text-neutral-600">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <button className="flex items-center text-sm font-medium text-neutral-900 hover:underline">
                View Details <ChevronRight className="ml-1 size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
