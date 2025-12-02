'use client';

import { memo } from 'react';

import { cn } from '@/lib/utils/cn';
import formatCurrency from '@/lib/utils/formatCurrency';

/**
 * Props for price display.
 */
export interface CartItemPriceProps {
  /** Current (discounted) price in the smallest currency unit */
  currentPrice: number;

  /** Original price before discount (optional) */
  oldPrice?: number;

  /** Optional additional class names */
  className?: string;
}

/**
 * CartItemPrice.
 *
 * Displays current price with optional strikethrough old price.
 * Used in cart items to show pricing with discount indication.
 *
 * @remarks
 * - Shows old price with `line-through` only if `oldPrice > currentPrice`.
 * - Current price is always bold and prominent.
 * - Fully memoized to prevent re-renders on parent updates.
 * - **Exported in two forms**:
 *   - `CartItemPrice` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartItemPrice({ currentPrice, oldPrice = 0, className = '' }: CartItemPriceProps) {
  const hasDiscount = oldPrice > currentPrice;

  return (
    <div className={cn('flex flex-col', className)}>
      {hasDiscount && (
        <span className={cn('text-gray-500 line-through')}>{formatCurrency(oldPrice)}</span>
      )}
      <span className={cn('text-lg font-bold')}>{formatCurrency(currentPrice)}</span>
    </div>
  );
}

export default memo(CartItemPrice);
