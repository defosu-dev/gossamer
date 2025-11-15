"use client";

import { cn } from "@/utils/cn";
import { CartItemWithProduct } from "@/hooks/useCart";
import Link from "next/link";
import React, { memo, useRef } from "react";
import CartItem from "./CartItem";
import formatCurrency from "@/utils/formatCurrency";
import { X } from "lucide-react";

/**
 * Props for the {@link CartDropdown} component.
 *
 * @typedef {Object} ICartDropdown
 * @property {boolean} open - Controls dropdown visibility.
 * @property {() => void} onClose - Handler to close the dropdown.
 * @property {CartItemWithProduct[]} items - Enriched cart items with product and variant data.
 * @property {number} total - Total cart price in base currency units (e.g., dollars).
 * @property {(variantId: string, quantity: number) => void} onQuantityChange
 *   - Called when user changes item quantity.
 *   - @param {string} variantId - Variant identifier.
 *   - @param {number} quantity - New quantity (>= 0).
 */
export type ICartDropdown = {
  open: boolean;
  onClose: () => void;
  items: CartItemWithProduct[];
  total: number;
  onQuantityChange: (variantId: string, quantity: number) => void;
};

/**
 * CartDropdown — floating panel showing cart contents.
 *
 * Features:
 * - Accessible dialog (`role="dialog"`, `aria-modal`)
 * - Smooth open/close animation (scale + opacity)
 * - Responsive width: `w-xs` (mobile), `w-lg` (desktop)
 * - Scrollable item list with max height
 * - Empty state handling
 * - Footer with total and "View all" link
 *
 * @component
 * @param {ICartDropdown} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <CartDropdown
 *   open={isOpen}
 *   onClose={close}
 *   items={cart}
 *   total={totalPrice}
 *   onQuantityChange={updateQuantity}
 * />
 * ```
 */
const CartDropdown = memo(
  ({ open, onClose, items, total, onQuantityChange }: ICartDropdown) => {
    const dialogId = "cart-dropdown";
    const listRef = useRef<HTMLUListElement>(null);

    return (
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        className={cn(
          "absolute right-0 mt-2 flex flex-col w-xs md:w-lg z-50 bg-white origin-top-right transition-all duration-200 overflow-hidden",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
          "border border-neutral-300 rounded-xl shadow-xl"
        )}
      >
        {/* Header */}
        <div className="px-3 py-2 flex items-center justify-between">
          <h3 id={`${dialogId}-title`} className="text-sm font-semibold">
            Your cart
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-sm opacity-70 hover:opacity-100 transition-opacity p-1 cursor-pointer rounded-full"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Items List */}
        <ul
          ref={listRef}
          tabIndex={-1}
          className="max-h-96 overflow-y-auto scroll-smooth divide-y divide-gray-200"
        >
          {items.length === 0 ? (
            <li className="p-4 text-center text-sm text-gray-600">
              Your cart is empty
            </li>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.variant_id}
                variantId={item.variant_id}
                title={
                  item.variant.name || item.product.title || "Unnamed Product"
                }
                image={item.variant.images[0]?.url ?? ""}
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

        {/* Footer */}
        <div className="border-t border-gray-200 px-3 py-2 flex justify-between items-center gap-4">
          <Link
            href="/cart"
            onClick={onClose}
            className="text-sm font-semibold underline hover:no-underline transition"
          >
            All products
          </Link>

          <span className="font-semibold text-sm">
            Total: {formatCurrency(total)}
          </span>
        </div>
      </div>
    );
  }
);

CartDropdown.displayName = "CartDropdown";
export default CartDropdown;
