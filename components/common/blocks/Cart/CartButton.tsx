'use client';

import { ShoppingCart } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/utils/cn';

/**
 * Props for the CartButton component.
 */
export interface CartButtonProps {
  /** Whether the cart dropdown is currently open */
  open: boolean;

  /** Number of items in the cart */
  count: number;

  /** Click handler to toggle the cart dropdown */
  onClick: () => void;
}

/**
 * CartButton.
 *
 * A compact, accessible button that opens the cart dropdown.
 * Displays item count badge when cart is not empty.
 *
 * @remarks
 * - Uses `aria-haspopup="menu"` and `aria-expanded` for screen readers.
 * - Visual feedback: hover, active scale, inner shadow.
 * - Badge appears only when `count > 0`.
 * - Fully keyboard-accessible with focus styles.
 * - **Exported in two forms**:
 *   - `CartButton` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartButton({ open, count, onClick }: CartButtonProps) {
  return (
    <button
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={onClick}
      type="button"
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-full',
        'border border-neutral-300 bg-white shadow',
        'transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner'
      )}
    >
      <ShoppingCart className="size-4.5 text-gray-700" />
      {count > 0 && (
        <div
          className={cn(
            'absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring ring-white'
          )}
        >
          <span className="text-[10px] font-medium text-red-100">{count}</span>
        </div>
      )}
    </button>
  );
}

export default memo(CartButton);
