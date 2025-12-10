/**
 * Checks whether the product has an active discount.
 *
 * @param minPrice Minimum current price (from `getMinPrice`).
 * @param maxOldPrice Maximum old price (from `getMaxOldPrice`).
 * @returns `true` only if both prices exist and old price > current price.
 */
export const hasDiscount = (minPrice: number | null, maxOldPrice: number | null): boolean => {
  return minPrice !== null && maxOldPrice !== null && maxOldPrice > minPrice;
};

