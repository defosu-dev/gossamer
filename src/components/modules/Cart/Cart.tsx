'use client';

import { memo, useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils/cn';
import { useCart } from '@/hooks/useCart'; // Новий шлях

import CartDropdown from './CartDropdown';
import CartButton from './CartButton';
import DarkBackground from '@/components/ui/DarkBackground';

/**
 * Cart Container Component.
 * Integrates the new useCart hook with the UI.
 */
export function Cart() {
  const [open, setOpen] = useState(false);

  const { items, totalQuantity, totalPrice, updateQuantity, removeItem, isLoading } = useCart();

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const closeCart = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closeCart]);

  return (
    <div className={cn('relative')}>
      <CartButton onClick={toggle} open={open} count={totalQuantity} isLoading={isLoading} />

      <DarkBackground open={open} onClose={closeCart} />

      <CartDropdown
        open={open}
        onClose={closeCart}
        items={items}
        total={totalPrice}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeItem}
        isLoading={isLoading}
      />
    </div>
  );
}

export default memo(Cart);
