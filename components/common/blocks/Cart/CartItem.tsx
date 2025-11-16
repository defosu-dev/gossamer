// src/components/cart/CartItem.tsx
'use client';

import Checkbox from '@/components/common/Checkbox';
import DeleteButton from '@/components/common/DeleteButton';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import InputQuantity from '@/components/common/InputQuantity';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';
import { cn } from '@/utils/cn';
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import CartDescription from './CartDescription';
import CartItemPrice from './CartItemPrice';
import { Badge } from '@/components/common/Badge';

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
    currentPrice: number;
    oldPrice: number;
  };

  /** Current quantity from store */
  quantity: number;

  /** Optional list of attributes like color, size, type */
  attributes?: { label: string; value: string }[];

  /** Handler for quantity changes or removal (qty = 0) */
  onChange: (variantId: string, quantity: number) => void;

  /** Whether the item is currently selected */
  selected?: boolean;

  /** Callback when selection state changes */
  onSelect?: (variantId: string, selected: boolean) => void;

  /** Controls whether checkbox is rendered */
  showCheckbox?: boolean;
}

/**
 * CartItem
 *
 * Represents a single item in the shopping cart dropdown.
 * Optimistically updates quantity and supports deletion.
 *
 * @remarks
 * - Debounces quantity changes to reduce store/network updates.
 * - Fully accessible: images with alt, focus-visible styling on interactive elements.
 * - Designed for Tailwind `group` usage for hover effects.
 * - Optional checkbox for selection (controlled via `showCheckbox`).
 * - **Exported in two forms**:
 *   - `CartItem` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartItem({
  variantId,
  title,
  image,
  price,
  quantity: externalQuantity,
  attributes = [],
  onChange,
  selected = false,
  onSelect,
  showCheckbox = false,
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(externalQuantity);
  const prevExternal = useRef(externalQuantity);

  // Debounced callback to sync quantity with parent/store
  const debouncedSend = useDebouncedCallback((qty: number) => {
    onChange(variantId, qty);
  }, 300);

  // Sync local quantity if external quantity changes
  useEffect(() => {
    if (prevExternal.current !== externalQuantity) {
      setLocalQuantity(externalQuantity);
    }
    prevExternal.current = externalQuantity;
  }, [externalQuantity]);

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
      {/* Checkbox — only if showCheckbox is true */}
      {showCheckbox && (
        <div className="flex items-start pt-1">
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelectChange}
            aria-label={`Select ${title}`}
          />
        </div>
      )}

      <div className={cn('grid flex-1 grid-cols-4 gap-3', showCheckbox && 'ml-0')}>
        {/* Product image */}
        <div className="relative col-span-1 aspect-square w-full overflow-hidden rounded-lg shadow">
          <ImageWithFallback
            src={image}
            alt={title}
            sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
            iconSize={6}
          />
        </div>

        {/* Product info */}
        <div className="col-span-2 flex flex-col">
          <Badge as="link" href="#" className="self-start">
            Product
          </Badge>

          <div className="mt-2 truncate font-bold text-gray-800" title={title}>
            {title}
          </div>

          <CartDescription items={attributes} className="mt-1" />
        </div>

        {/* Price and controls */}
        <div className="col-span-1 flex flex-col items-end">
          <CartItemPrice
            currentPrice={price.currentPrice}
            oldPrice={price.oldPrice}
            className="text-end"
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
