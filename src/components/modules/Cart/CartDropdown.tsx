'use client';

import Link from 'next/link';
import { memo, useRef } from 'react';
import { X, ShoppingBag } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import formatCurrency from '@/lib/utils/formatCurrency';
import { to } from '@/config/routes';

// Імпортуємо правильні типи
import type { CartItemDTO } from '@/types/api';
import type { LocalCartItem } from '@/types/store';

// Об'єднаний тип для елемента інтерфейсу
type UIItem = CartItemDTO | LocalCartItem;

// Імпорт компонента елемента списку (переконайтеся, що він теж оновлений)
import { CartItem } from './CartItem';
import Button from '@/components/ui/Button';

export interface CartDropdownProps {
  open: boolean;
  onClose: () => void;
  items: UIItem[];
  total: number;
  isLoading?: boolean;
  onQuantityChange: (variantId: string, quantity: number, id?: string) => void;
  onRemoveItem: (variantId: string, id?: string) => void;
}

export function CartDropdown({
  open,
  onClose,
  items,
  total,
  onQuantityChange,
  onRemoveItem,
}: CartDropdownProps) {
  const dialogId = 'cart-dropdown';
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div
      id={dialogId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${dialogId}-title`}
      className={cn(
        'absolute right-0 z-50 mt-3 flex w-[90vw] max-w-sm origin-top-right flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl transition-all duration-200 sm:w-96',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
        <h3 id={`${dialogId}-title`} className="text-sm font-semibold text-neutral-900">
          Shopping Cart ({items.length})
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="group rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Items List */}
      <ul ref={listRef} className="max-h-[60vh] space-y-4 overflow-y-auto scroll-smooth p-4">
        {items.length === 0 ? (
          <li className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-neutral-50 p-4">
              <ShoppingBag className="size-8 text-neutral-300" />
            </div>
            <p className="text-sm font-medium text-neutral-900">Your cart is empty</p>
            <p className="mt-1 max-w-[150px] text-xs text-neutral-500">
              Looks like you haven't added anything yet.
            </p>
            <Button className="mt-4 w-full" onClick={onClose}>
              Start Shopping
            </Button>
          </li>
        ) : (
          items.map((item) => {
            // Визначаємо ID запису (якщо це серверний товар)
            const dbId = 'id' in item ? item.id : undefined;

            return (
              <CartItem
                key={item.variantId}
                variantId={item.variantId}
                // Наші типи тепер плоскі, без вкладеностей variant/product
                title={item.title}
                image={item.imageUrl ?? ''}
                price={{
                  currentPrice: item.price,
                  oldPrice: item.oldPrice ?? undefined,
                }}
                quantity={item.quantity}
                // Передаємо рядок атрибутів або порожній масив, залежно від того, що приймає CartItem
                // Якщо CartItem очікує string:
                attributesDescription={item.attributesDescription}
                onChange={(q) => onQuantityChange(item.variantId, q, dbId)}
                onRemove={() => onRemoveItem(item.variantId, dbId)}
              />
            );
          })
        )}
      </ul>

      {/* Footer */}
      {items.length > 0 && (
        <div className="space-y-3 border-t border-neutral-100 bg-neutral-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Subtotal</span>
            <span className="text-base font-bold text-neutral-900">{formatCurrency(total)}</span>
          </div>

          <Link href={to.checkout()} onClick={onClose} className="block w-full">
            <Button className="w-full justify-center">Checkout</Button>
          </Link>

          <Link
            href={to.cart()}
            onClick={onClose}
            className="block text-center text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            View full cart
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(CartDropdown);
