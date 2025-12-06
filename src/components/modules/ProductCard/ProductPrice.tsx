import { cn } from '@/lib/utils/cn';
import formatCurrency from '@/lib/utils/formatCurrency';

interface ProductPriceProps {
  /** The main display price (usually current price of default variant). */
  price: number;

  /** The old price (for discount comparison). Optional. */
  oldPrice?: number | null;

  /** Optional styling class. */
  className?: string;
}

/**
 * ProductPrice.
 *
 * @remarks
 * Renders the product price. Automatically shows the old price if it exists and is higher than the current price.
 */
export function ProductPrice({ price, oldPrice, className }: ProductPriceProps) {
  if (price === null || price === undefined) {
    return <p className="text-lg font-bold text-gray-900">Unavailable</p>;
  }

  const formattedPrice = formatCurrency(price);

  const isDiscounted = oldPrice != null && oldPrice > price;
  const formattedOldPrice = isDiscounted ? formatCurrency(oldPrice) : null;

  return (
    <div className={cn('flex flex-col items-end', className)}>
      {isDiscounted && (
        <span className="mb-0.5 text-xs text-gray-400 line-through">{formattedOldPrice}</span>
      )}

      <span
        className={cn(
          'font-bold text-gray-900',
          isDiscounted ? 'text-red-600' : 'text-gray-900',
          'text-lg'
        )}
      >
        {formattedPrice}
      </span>
    </div>
  );
}

export default ProductPrice;
