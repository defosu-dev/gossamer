'use client';

import { Minus, Plus } from 'lucide-react';
import { memo, useCallback } from 'react';

import { cn } from '@/lib/utils/cn';

/**
 * Props for InputQuantity.
 */
export interface InputQuantityProps {
  /** Current quantity value */
  quantity: number;

  /** Immediate change handler */
  onChange: (newQuantity: number) => void;

  /** Optional additional class names */
  className?: string;
}

/**
 * InputQuantity.
 *
 * Compact +/- quantity control for cart items.
 * Prevents quantity from going below 1.
 *
 * @remarks
 * - Buttons are fully accessible with `aria-label`.
 * - Quantity is announced via `aria-live="polite"` for screen readers.
 * - Hover feedback with background transition.
 * - Fully memoized to prevent re-renders.
 * - **Exported in two forms**:
 *   - `InputQuantity` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function InputQuantity({ quantity, onChange, className }: InputQuantityProps) {
  const increment = useCallback(() => onChange(quantity + 1), [quantity, onChange]);
  const decrement = useCallback(() => onChange(Math.max(1, quantity - 1)), [quantity, onChange]);

  return (
    <div
      className={cn(
        'flex h-8 overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow',
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        aria-label="Decrease quantity"
        className={cn(
          'flex w-8 cursor-pointer items-center justify-center transition-colors hover:bg-neutral-100'
        )}
      >
        <Minus className={cn('size-3')} />
      </button>

      <span
        className={cn('flex w-8 items-center justify-center text-sm font-semibold')}
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increment}
        aria-label="Increase quantity"
        className={cn(
          'flex w-8 cursor-pointer items-center justify-center transition-colors hover:bg-neutral-100'
        )}
      >
        <Plus className={cn('size-3')} />
      </button>
    </div>
  );
}

export default memo(InputQuantity);
