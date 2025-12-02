'use client';

import { useCart } from '@/lib/hooks/useCart';
import CartItem from '@/components/modules/Cart/CartItem';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { useCallback, useState } from 'react';

export default function CartItemsList() {
  const { cart, updateQuantity } = useCart();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected = cart.length > 0 && selectedIds.size === cart.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < cart.length;

  const toggleAll = useCallback(() => {
    if (allSelected || someSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(cart.map((item) => item.variant_id)));
  }, [cart, allSelected, someSelected]);

  const handleItemSelect = useCallback((variantId: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      !selected ? next.add(variantId) : next.delete(variantId);
      return next;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    selectedIds.forEach((id) => updateQuantity(id, 0));
    setSelectedIds(new Set());
  }, [selectedIds, updateQuantity]);

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      {/* Selection Controls */}
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={toggleAll}
          label="Select All"
          className={someSelected ? 'indeterminate' : ''}
        />
        <Button onClick={handleDeleteSelected} disabled={selectedIds.size === 0}>
          Delete
        </Button>
      </div>

      {/* Items or Empty State */}
      <div className="flex flex-col gap-4">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center gap-4 rounded-lg border border-neutral-200 p-4 py-20">
            <h3 className="text-2xl font-bold text-neutral-500">Your cart is empty</h3>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.variant_id}
              variantId={item.variant_id}
              title={item.variant.name ?? item.product.title ?? 'Unnamed Product'}
              image={item.variant.images[0]?.url ?? ''}
              price={{
                currentPrice: item.variant.price,
                oldPrice: item.variant.old_price ?? 0,
              }}
              quantity={item.quantity}
              attributes={[]}
              onChange={updateQuantity}
              showCheckbox
              selected={selectedIds.has(item.variant_id)}
              onSelect={handleItemSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}
