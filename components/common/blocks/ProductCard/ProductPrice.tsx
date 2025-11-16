// components/common/ProductPrice/ProductPrice.tsx
import React from "react";

/**
 * Renders product price with optional discount display.
 * - Uses `Intl.NumberFormat` for USD currency formatting.
 * - Preserves original styling: `text-xl font-bold text-gray-900` for main price.
 * - Shows strikethrough old price (`text-sm text-gray-500 line-through`) if discount applies.
 * - Falls back to "Price unavailable" if no current price.
 *
 * @param minPrice      - Lowest current price across variants. `null` = no price.
 * @param maxOldPrice   - Highest old price (for discount). Optional.
 * @param showDiscount  - If `true`, shows old price when `maxOldPrice > minPrice`.
 */
type ProductPriceProps = {
  minPrice: number | null;
  maxOldPrice?: number | null;
  showDiscount?: boolean;
};

const ProductPrice = ({
  minPrice,
  maxOldPrice,
  showDiscount = false,
}: ProductPriceProps) => {
  // No price available
  if (minPrice === null) {
    return <p className="text-xl font-bold text-gray-900">Price unavailable</p>;
  }

  // Format current price (e.g., $54.99)
  const formattedMin = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minPrice);

  // Format old price (if provided)
  const formattedOld = maxOldPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(maxOldPrice)
    : null;

  // Determine if discount should be shown
  const hasDiscount = showDiscount && maxOldPrice && maxOldPrice > minPrice;

  return (
    <div className="flex flex-col-reverse items-center gap-x-2">
      {/* Main price */}
      <p className="text-xl font-bold text-gray-900">{formattedMin}</p>

      {/* Discounted old price (strikethrough) */}
      {hasDiscount && formattedOld && (
        <p className="text-sm text-gray-500 line-through">{formattedOld}</p>
      )}
    </div>
  );
};

export default ProductPrice;
