'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import CartDropdown from './CartDropdown';
import CartButton from './CartButton';
import DarkBackground from '@/components/common/DarkBackground';
import { useCart } from '@/hooks';

/**
 * Props for the Cart component.
 *
 * @remarks
 * This component accepts no external props — all state is managed internally
 * and via the `useCart` hook.
 */
export interface CartProps {}

/**
 * Cart
 *
 * Root component for the shopping cart UI in the header.
 * Manages dropdown visibility, integrates with `useCart` hook, and handles
 * keyboard accessibility (Escape key).
 *
 * @remarks
 * - Controls open/close state locally.
 * - Uses `useCart` for cart data: items, total, quantity updates.
 * - Closes on `Escape` key when open.
 * - Renders `DarkBackground` overlay for modal-like behavior.
 * - Composes `CartButton` and `CartDropdown`.
 * - **Exported in two forms**:
 *   - `Cart` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function Cart({}: CartProps) {
  const [open, setOpen] = useState(false);
  const { totalItems, cart, totalPrice, updateQuantity } = useCart();

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const closeCart = useCallback(() => setOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closeCart]);

  return (
    <div className="relative">
      <CartButton onClick={toggle} open={open} count={totalItems} />

      <DarkBackground open={open} onClose={closeCart} />

      <CartDropdown
        open={open}
        onClose={closeCart}
        items={cart}
        total={totalPrice}
        onQuantityChange={updateQuantity}
      />
    </div>
  );
}

export default memo(Cart);
