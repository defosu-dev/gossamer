"use client";

import { useCallback, useEffect, useState } from "react";
import CartDropdown from "./CartDropdown";
import CartButton from "./CartButton";
import DarkBackground from "@/components/common/DarkBackground";
import { useCart } from "@/hooks";

/**
 * Props for the {@link Cart} component. This component does not accept any external props.
 *
 * @typedef {Object} ICartProps
 *   - No external props are required or accepted.
 */
export type ICartProps = Record<string, never>;

/**
 * Root component for managing the shopping cart UI.
 *
 * Responsibilities:
 * - Handles dropdown visibility state with open/close/toggle logic.
 * - Integrates with `useCart` hook for cart data (items, total, quantity updates).
 * - Provides keyboard accessibility: closes on Escape key when open.
 * - Renders overlay background for modal-like behavior.
 * - Wires up presentational components: {@link CartButton}, {@link CartDropdown}, and {@link DarkBackground}.
 *
 * Usage:
 * - Place this component in the header or navigation for cart icon access.
 * - Relies on `useCart` for state management; ensure it's provided in the context.
 *
 * Accessibility:
 * - Keyboard: Escape key closes the dropdown.
 * - Screen readers: Dialog role handled in {@link CartDropdown}.
 *
 * @component
 * @example
 * ```tsx
 * <Cart />
 * ```
 *
 * @param {ICartProps} _props - No props are used (empty object for type safety).
 */
const Cart = (_props: ICartProps) => {
  const [open, setOpen] = useState(false);
  const { totalItems, cart, totalPrice, updateQuantity } = useCart();

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const closeCart = useCallback(() => setOpen(false), []);

  // Close on Escape for keyboard users
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
};

export default Cart;
