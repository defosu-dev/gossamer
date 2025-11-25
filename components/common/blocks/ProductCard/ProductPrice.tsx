import { cn } from '@/utils/cn';

interface ProductPriceProps {
  /** Lowest current price across variants. `null` means no price available. */
  minPrice: number | null;

  /** Highest old price (for discount). Optional. */
  maxOldPrice?: number | null;

  /** If `true`, shows old price when `maxOldPrice > minPrice`. */
  showDiscount?: boolean;
}

/**
 *
 * @remarks
 * Renders product price with optional discount display.
 * - Uses `Intl.NumberFormat` for USD currency formatting.
 * - Main price styled as `text-xl font-bold text-gray-900`.
 * - Shows strikethrough old price (`text-sm text-gray-500 line-through`) if discount applies.
 * - Falls back to "Price unavailable" if no current price.
 */
export function ProductPrice({ minPrice, maxOldPrice, showDiscount = false }: ProductPriceProps) {
  if (minPrice == null) {
    return <p className={cn('text-xl font-bold text-gray-900')}>Price unavailable</p>;
  }

  const formattedMin = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minPrice);

  const formattedOld =
    maxOldPrice != null
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(maxOldPrice)
      : null;

  const hasDiscount = showDiscount && maxOldPrice != null && maxOldPrice > minPrice;

  return (
    <div className={cn('flex flex-col-reverse items-center gap-x-2')}>
      <p className={cn('text-xl font-bold text-gray-900')}>{formattedMin}</p>
      {hasDiscount && formattedOld != null && (
        <p className={cn('text-sm text-gray-500 line-through')}>{formattedOld}</p>
      )}
    </div>
  );
}

export default ProductPrice;
