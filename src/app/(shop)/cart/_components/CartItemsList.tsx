'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';

import CartItem from '@/components/modules/Cart/CartItem';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { useCart } from '@/hooks/useCart';
import { to } from '@/config/routes';
import type { CartItemDTO } from '@/types/api';

export default function CartItemsList() {
  const { items, updateQuantity, removeItem } = useCart();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected = items.length > 0 && selectedIds.size === items.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < items.length;

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(items.map((item) => item.variantId)));
  }, [items, allSelected]);

  const handleItemSelect = useCallback((variantId: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      selected ? next.add(variantId) : next.delete(variantId);
      return next;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    selectedIds.forEach((variantId) => {
      const item = items.find((i) => i.variantId === variantId);
      const dbId = item && 'id' in item ? (item as CartItemDTO).id : undefined;

      removeItem(variantId, dbId);
    });
    setSelectedIds(new Set());
  }, [selectedIds, items, removeItem]);

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      {/* Selection Controls */}
      {items.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={allSelected}
              onCheckedChange={toggleAll}
              label={selectedIds.size > 0 ? `${selectedIds.size} Selected` : 'Select All'}
            />
          </div>

          <Button onClick={handleDeleteSelected} disabled={selectedIds.size === 0}>
            Delete Selected
          </Button>
        </div>
      )}

      {/* Items or Empty State */}
      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-neutral-200 p-8 py-20 text-center">
            <h3 className="text-xl font-bold text-neutral-900">Your cart is empty</h3>
            <p className="text-neutral-500">Looks like you haven't added anything yet.</p>
            <Link href={to.products()}>
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((item) => {
              const dbId = 'id' in item ? (item as CartItemDTO).id : undefined;

              return (
                <CartItem
                  key={item.variantId}
                  variantId={item.variantId}
                  title={item.title ?? 'Unnamed Product'}
                  slug={item.slug}
                  image={item.imageUrl ?? ''}
                  price={{
                    currentPrice: item.price,
                    oldPrice: item.oldPrice ?? undefined,
                  }}
                  quantity={item.quantity}
                  attributesDescription={item.attributesDescription}
                  onChange={(qty) => updateQuantity(item.variantId, qty, dbId)}
                  onRemove={() => removeItem(item.variantId, dbId)}
                  showCheckbox
                  selected={selectedIds.has(item.variantId)}
                  onSelect={handleItemSelect}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
