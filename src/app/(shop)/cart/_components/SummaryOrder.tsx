'use client';

import { memo } from 'react';

import formatCurrency from '@/lib/utils/formatCurrency';
import Button from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';

/**
 * SummaryOrder.
 *
 * Sticky cart summary showing subtotal and buy button.
 * Optionally displays item count in the button.
 *
 * @remarks
 * - Sticky at `top-20` for persistent visibility.
 * - Responsive: full width on mobile, fixed width on md+.
 * - Button includes item count only if `totalItems > 0`.
 * - Uses `formatCurrency` for consistent formatting.
 */
export function SummaryOrder() {
  const { items } = useCart();
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.length;
  return (
    <div className="sticky top-20 flex h-fit w-full min-w-xs flex-col gap-2 rounded-lg border border-neutral-200 p-4 md:w-fit">
      <h3 className="text-xl font-bold text-neutral-900">Summary Order</h3>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-neutral-600">Subtotal:</span>
        <span className="text-lg font-bold text-neutral-900">{formatCurrency(totalPrice)}</span>
      </div>
      <Button>Buy Now {totalItems > 0 && `(${totalItems})`}</Button>
    </div>
  );
}

export default memo(SummaryOrder);
