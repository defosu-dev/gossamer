'use client';

import { cn } from '@/utils/cn';
import { CartItemWithProduct } from '@/hooks/useCart';
import Link from 'next/link';
import { memo, useRef } from 'react';
import formatCurrency from '@/utils/formatCurrency';
import { X } from 'lucide-react';
import { CartItem } from './CartItem';

/**
 * Props for the CartDropdown component.
 */
export interface CartDropdownProps {
  /**
   * Controls whether the dropdown is visible.
   */
  open: boolean;

  /**
   * Callback to close the dropdown.
   */
  onClose: () => void;

  /**
   * Array of cart items with full product and variant data.
   */
  items: CartItemWithProduct[];

  /**
   * Total price of all items in the cart (in the smallest currency unit).
   */
  total: number;

  /**
   * Handler for quantity changes or item removal (quantity = 0).
   *
   * @param variantId - Unique identifier of the product variant
   * @param quantity - New quantity (0 means remove)
   */
  onQuantityChange: (variantId: string, quantity: number) => void;
}

/**
 * CartDropdown
 *
 * A floating cart summary that appears on hover/click, showing cart contents,
 * total, and quick controls. Fully accessible and animated.
 *
 * @remarks
 * - Uses `role="dialog"` with proper ARIA attributes for screen readers.
 * - Smooth open/close animation via Tailwind `transition-all`.
 * - Scrollable item list with `max-h-96` and smooth scrolling.
 * - Optimistic updates via `CartItem` (debounced quantity sync).
 * - Mobile-first responsive: `w-xs` → `w-lg` on medium screens.
 * - Clicking outside or "Close" button triggers `onClose`.
 * - **Exported in two forms**:
 *   - `CartDropdown` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartDropdown({ open, onClose, items, total, onQuantityChange }: CartDropdownProps) {
  const dialogId = 'cart-dropdown';
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div
      id={dialogId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${dialogId}-title`}
      className={cn(
        'absolute right-0 z-50 mt-2 flex w-xs origin-top-right flex-col overflow-hidden bg-white transition-all duration-200 md:w-lg',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-1 scale-95 opacity-0',
        'rounded-xl border border-neutral-300 shadow-xl'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 id={`${dialogId}-title`} className="text-sm font-semibold">
          Your cart
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="cursor-pointer rounded-full p-1 text-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Cart Items List */}
      <ul
        ref={listRef}
        tabIndex={-1}
        className="max-h-96 divide-y divide-gray-200 overflow-y-auto scroll-smooth"
      >
        {items.length === 0 ? (
          <li className="p-4 text-center text-sm text-gray-600">Your cart is empty</li>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.variant_id}
              variantId={item.variant_id}
              title={item.variant.name || item.product.title || 'Unnamed Product'}
              image={item.variant.images[0]?.url ?? ''}
              price={{
                currentPrice: item.variant.price,
                oldPrice: item.variant.old_price ?? 0,
              }}
              quantity={item.quantity}
              attributes={[]} // Reserved for future use
              onChange={onQuantityChange}
            />
          ))
        )}
      </ul>

      {/* Footer: Total + View All */}
      <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-3 py-2">
        <Link
          href="/cart"
          onClick={onClose}
          className="text-sm font-semibold underline transition hover:no-underline focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          All products
        </Link>

        <span className="text-sm font-semibold">Total: {formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export default memo(CartDropdown);
