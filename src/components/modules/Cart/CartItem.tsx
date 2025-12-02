'use client';

import { memo, useCallback } from 'react';

import { cn } from '@/lib/utils/cn';

import CartDescription from './CartDescription';
import CartItemPrice from './CartItemPrice';
import Checkbox from '@/components/ui/Checkbox';
import DeleteButton from '@/components/ui/DeleteButton';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import InputQuantity from '@/components/ui/InputQuantity';
import Badge from '@/components/ui/Badge';
import { to } from '@/config/routes';

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

  /** Current quantity from parent/store */
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
 * Fully controlled: quantity and selection are passed from the parent.
 *
 * @remarks
 * - Does not maintain internal state for quantity or selection.
 * - Does not debounce changes; calls `onChange` immediately.
 * - Fully accessible: images with alt, focus-visible styling on interactive elements.
 * - Designed for Tailwind `group` usage for hover effects.
 * - Optional checkbox for selection (controlled via `showCheckbox` prop).
 * - Memoized for performance.
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
  /** Called when the quantity changes */
  const handleQuantityChange = useCallback(
    (newQty: number) => {
      if (newQty < 1) return;
      onChange(variantId, newQty);
    },
    [onChange, variantId]
  );

  /** Called when the item is deleted (quantity set to 0) */
  const handleDelete = useCallback(() => {
    onChange(variantId, 0);
  }, [onChange, variantId]);

  /** Called when the selection checkbox changes */
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
          <Badge as="link" href={to.products()} className={cn('self-start')}>
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
            <InputQuantity quantity={quantity} onChange={handleQuantityChange} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(CartItem);
