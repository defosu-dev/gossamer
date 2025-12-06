'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

// UI Components
import CartItemPrice from './CartItemPrice';
import Checkbox from '@/components/ui/Checkbox';
import DeleteButton from '@/components/ui/DeleteButton';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import InputQuantity from '@/components/ui/InputQuantity';
import Badge from '@/components/ui/Badge';

/**
 * Props for a single cart item.
 */
export interface CartItemProps {
  /** Unique product variant identifier */
  variantId: string;

  /** Product title */
  title: string;

  /** Product slug for linking */
  slug?: string;

  /** Main image URL */
  image: string;

  /** Pricing info */
  price: {
    currentPrice: number;
    oldPrice?: number;
  };

  /** Current quantity */
  quantity: number;

  /** Formatted attributes string (e.g. "Color: Red, Size: M") */
  attributesDescription?: string;

  /**
   * Handler for quantity changes.
   * Only called with positive integers > 0.
   */
  onChange: (quantity: number) => void;

  /**
   * Handler for item removal.
   */
  onRemove: () => void;

  /** Selection state (optional) */
  selected?: boolean;
  onSelect?: (variantId: string, selected: boolean) => void;
  showCheckbox?: boolean;
}

/**
 * CartItem component.
 *
 * Renders a single row in the cart dropdown or cart page.
 */
export function CartItem({
  variantId,
  title,
  slug,
  image,
  price,
  quantity,
  attributesDescription,
  onChange,
  onRemove,
  selected = false,
  onSelect,
  showCheckbox = false,
}: CartItemProps) {
  const handleQuantityChange = useCallback(
    (newQty: number) => {
      // Захист від 0 або від'ємних чисел. Видалення йде через onRemove.
      if (newQty < 1) return;
      onChange(newQty);
    },
    [onChange]
  );

  const handleSelectChange = useCallback(
    (checked: boolean) => {
      onSelect?.(variantId, checked);
    },
    [onSelect, variantId]
  );

  return (
    <li className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-50/50">
      {/* Optional Checkbox */}
      {showCheckbox && (
        <div className="flex items-start pt-1">
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelectChange}
            aria-label={`Select ${title}`}
          />
        </div>
      )}

      <div className={cn('grid flex-1 grid-cols-[auto_1fr_auto] gap-4', showCheckbox && 'ml-0')}>
        {/* 1. Image */}
        <div className="relative aspect-square w-20 overflow-hidden rounded-md border border-neutral-200 bg-white">
          <ImageWithFallback src={image} alt={title} className="object-cover" sizes="80px" />
        </div>

        {/* 2. Info */}
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            {slug ? (
              <Link href={to.product(slug)} className="group-hover:underline">
                <h4 className="line-clamp-2 text-sm font-semibold text-neutral-900" title={title}>
                  {title}
                </h4>
              </Link>
            ) : (
              <h4 className="line-clamp-2 text-sm font-semibold text-neutral-900" title={title}>
                {title}
              </h4>
            )}

            {/* Attributes */}
            {attributesDescription && (
              <p className="mt-1 line-clamp-1 text-xs text-neutral-500">{attributesDescription}</p>
            )}

            {/* Optional Badge if needed */}
            {/* <Badge variant="outline" className="mt-2 w-fit text-[10px] h-5 px-1.5">
               In Stock
             </Badge> */}
          </div>
        </div>

        {/* 3. Actions & Price */}
        <div className="flex flex-col items-end justify-between">
          <CartItemPrice
            currentPrice={price.currentPrice}
            oldPrice={price.oldPrice ?? 0}
            className="text-right"
          />

          <div className="mt-2 flex items-center gap-3">
            <InputQuantity quantity={quantity} onChange={handleQuantityChange} />
            <DeleteButton onDelete={onRemove} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(CartItem);
