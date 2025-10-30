import type { ProductWithRelations } from "@/types/IProductsWithRelations";

/**
 * Returns the lowest `current_price` across all variants.
 * @returns `number` if any price exists, otherwise `null`.
 */
export const getMinPrice = (
  variants: ProductWithRelations["product_variants"]
): number | null => {
  const prices = variants
    .map((v) => v.current_price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
};

/**
 * Returns the highest `old_price` across all variants.
 * @returns `number` if any old price exists, otherwise `null`.
 */
export const getMaxOldPrice = (
  variants: ProductWithRelations["product_variants"]
): number | null => {
  const prices = variants
    .map((v) => v.old_price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.max(...prices) : null;
};

/**
 * Checks if there's a discount: old price > current price.
 * @returns `true` only if both prices exist and discount applies.
 */
export const hasDiscount = (
  minPrice: number | null,
  maxOldPrice: number | null
): boolean => {
  return minPrice !== null && maxOldPrice !== null && maxOldPrice > minPrice;
};
