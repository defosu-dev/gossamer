'use client';

import { useCart } from '@/hooks/useCart';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import formatCurrency from '@/lib/utils/formatCurrency';
import { cn } from '@/lib/utils/cn';

export function OrderSummary({ className }: { className?: string }) {
  const { items, totalPrice, isLoading } = useCart();

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl bg-neutral-100" />;
  }

  return (
    <div className={cn('rounded-2xl p-6 shadow-sm', className)}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">Order Summary</h2>

      {/* Items List */}
      <div className="scrollbar-thin mb-6 max-h-[300px] space-y-4 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.variantId} className="flex gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-white">
              <ImageWithFallback
                src={item.imageUrl ?? ''}
                alt={item.title}
                className="object-cover"
              />
              <span className="absolute right-0 bottom-0 flex h-5 w-5 -translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white shadow-sm">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="line-clamp-2 text-sm font-medium text-neutral-900">{item.title}</h4>
              <p className="text-xs text-neutral-500">{item.attributesDescription}</p>
            </div>
            <div className="flex flex-col justify-center text-right">
              <span className="text-sm font-semibold text-neutral-900">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-neutral-200 pt-4">
        <div className="flex justify-between text-sm text-neutral-600">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-neutral-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-bold text-neutral-900">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
