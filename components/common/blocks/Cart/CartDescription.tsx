'use client';

import { memo } from 'react';

import { cn } from '@/utils/cn';

/**
 * Props for the CartItemDescription component.
 */
export interface CartDescriptionProps {
  /** List of attribute key-value pairs to display (e.g., color, size) */
  items: { label: string; value: string }[];

  /** Optional additional class names */
  className?: string;
}

/**
 * CartItemDescription.
 *
 * Renders a list of product attributes in a compact, readable format.
 * Used in cart dropdown items to show variant details.
 *
 * @remarks
 * - Renders nothing if `items` is empty.
 * - Each item is displayed as `Label: Value` with bold value.
 * - Fully accessible and Tailwind-compatible.
 * - **Exported in two forms**:
 *   - `CartItemDescription` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function CartItemDescription({ items, className = '' }: CartDescriptionProps) {
  if (!items.length) return null;

  return (
    <div className={cn('flex items-center gap-4 text-sm text-gray-600', className)}>
      {items.map((item, i) => (
        <div key={`${item.label}-${i}`}>
          {item.label}: <span className="font-semibold text-gray-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(CartItemDescription);
