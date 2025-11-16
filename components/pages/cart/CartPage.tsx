'use client';

import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { cn } from '@/utils/cn';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CartItem from '@/components/common/blocks/Cart/CartItem';
import { useCart } from '@/hooks';
import Checkbox from '@/components/common/Checkbox';
import { SummaryOrder } from './sections/SummaryOrder';
import { memo, useCallback, useState } from 'react';

/**
 * CartPage
 *
 * Full cart page displaying all items, selection controls, and order summary.
 * Integrates with `useCart` hook for state management.
 *
 * @remarks
 * - Responsive layout: column on mobile, row on md+.
 * - Supports bulk selection via "Select All" checkbox.
 * - Empty state with centered message.
 * - Breadcrumbs for navigation.
 * - Sticky summary on larger screens.
 * - **Exported in two forms**:
 *   - `CartPage` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartPage() {
  const { cart, totalPrice, totalItems, updateQuantity } = useCart();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
  ];

  const allSelected = cart.length > 0 && selectedIds.size === cart.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < cart.length;

  const toggleAll = useCallback(() => {
    if (allSelected || someSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cart.map((item) => item.variant_id)));
    }
  }, [cart, allSelected, someSelected]);

  const handleItemSelect = useCallback((variantId: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(variantId);
      } else {
        next.delete(variantId);
      }
      return next;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    selectedIds.forEach((id) => updateQuantity(id, 0));
    setSelectedIds(new Set());
  }, [selectedIds, updateQuantity]);

  return (
    <Container>
      <div className="flex w-full flex-col">
        <Breadcrumbs items={breadcrumbs} />

        <h2 className={cn('text-5xl font-bold text-neutral-900', 'mt-4')}>My Cart</h2>

        <div className="mt-10 flex w-full flex-col-reverse gap-8 md:flex-row">
          {/* Cart Items List */}
          <div className="flex w-full flex-1 flex-col gap-6">
            {/* Selection Controls */}
            <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleAll}
                label="Select All"
                // Indeterminate state for partial selection
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
                    title={item.variant.name || item.product.title || 'Unnamed Product'}
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

          {/* Order Summary */}
          <SummaryOrder totalPrice={totalPrice} totalItems={totalItems} />
        </div>
      </div>
    </Container>
  );
}

export default memo(CartPage);
