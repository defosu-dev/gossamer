// src/components/cart/CartItem.tsx
'use client';

import { useState, useCallback, memo } from 'react';

import { cn } from '@/utils/cn';
import Checkbox from '@/components/common/Checkbox';
import DeleteButton from '@/components/common/DeleteButton';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import InputQuantity from '@/components/common/InputQuantity';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';
import { Badge } from '@/components/common/Badge';

import CartDescription from './CartDescription';
import CartItemPrice from './CartItemPrice';

/**
 * Props for a single cart item in the dropdown.
 */
export interface CartItemProps {

  /** Unique product variant identifier */
  variantId: string;

  /** Product display title */
  title: string;

  /** Main image URL for the product */
  image: string;

  /** Pricing information */
  price: {

    /** Current sale price */
    currentPrice: number;

    /** Original price (crossed out) */
    oldPrice: number;
  };

  /** Current quantity from store/state */
  quantity: number;

  /** Optional list of product attributes like color, size, etc. */
  attributes?: { label: string; value: string }[];

  /**
   * Handler for quantity changes or removal.
   * - If quantity = 0, the item is removed.
   */
  onChange: (variantId: string, quantity: number) => void;

  /** Whether the item is currently selected */
  selected?: boolean;

  /** Callback when selection state changes */
  onSelect?: (variantId: string, selected: boolean) => void;

  /** Controls whether the checkbox is rendered */
  showCheckbox?: boolean;
}

/**
 * CartItem component.
 *
 * Represents a single item in the shopping cart dropdown.
 * Optimistically updates quantity and supports deletion.
 *
 * @remarks
 * - Debounces quantity updates to reduce store/network calls.
 * - Fully accessible: images with alt, focus-visible styling on interactive elements.
 * - Designed for Tailwind `group` usage for hover effects.
 * - Optional checkbox for selection (controlled via `showCheckbox` prop).
 * - Memoized for performance.
 * - Two forms exported:
 *   - `CartItem` — function component for HOC or testing
 *   - `default export` — memoized version for production
 */
export function CartItem({
  variantId,
  title,
  image,
  price,
  quantity,
  attributes = [],
  onChange,
  selected = false,
  onSelect,
  showCheckbox = false,
}: CartItemProps) {

  // Local quantity state
  const [localQuantity, setLocalQuantity] = useState(quantity);

  // Sync localQuantity if external quantity prop changes
  if (localQuantity !== quantity) {
    setLocalQuantity(quantity);
  }

  // Debounced callback to notify parent/store about quantity changes
  const debouncedSend = useDebouncedCallback((qty: number) => {
    onChange(variantId, qty);
  }, 300);

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      if (newQty < 1) return;
      setLocalQuantity(newQty);
      debouncedSend(newQty);
    },
    [debouncedSend]
  );

  const handleDelete = useCallback(() => {
    onChange(variantId, 0);
  }, [onChange, variantId]);

  const handleSelectChange = useCallback(
    (checked: boolean) => {
      onSelect?.(variantId, checked);
    },
    [onSelect, variantId]
  );

  return (
    <li className="group flex gap-3 p-3">
      {showCheckbox && (
        <div className={cn('flex items-start pt-1')}>
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelectChange}
            aria-label={`Select ${title}`}
          />
        </div>
      )}

      <div className={cn('grid flex-1 grid-cols-4 gap-3', showCheckbox && 'ml-0')}>
        <div className="relative col-span-1 aspect-square w-full overflow-hidden rounded-lg shadow">
          <ImageWithFallback
            src={image}
            alt={title}
            sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
            iconSize={6}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <Badge as="link" href="#" className={cn('self-start')}>
            Product
          </Badge>

          <div className="mt-2 truncate font-bold text-gray-800" title={title}>
            {title}
          </div>

          <CartDescription items={attributes} className={cn('mt-1')} />
        </div>

        <div className="col-span-1 flex flex-col items-end">
          <CartItemPrice
            currentPrice={price.currentPrice}
            oldPrice={price.oldPrice}
            className={cn('text-end')}
          />

          <div className="mt-auto flex items-center gap-4">
            <DeleteButton onDelete={handleDelete} />
            <InputQuantity quantity={localQuantity} onChange={handleQuantityChange} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(CartItem);
