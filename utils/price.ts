'use client';

import type { ProductWithRelations } from '@/types/IProductsWithRelations';

/**
 * Returns the lowest `current_price` across all variants.
 *
 * @param variants Array of product variants.
 * @returns Lowest price as `number`, or `null` if no priced variants exist.
 */
export const getMinPrice = (variants: ProductWithRelations['product_variants']): number | null => {
  const prices = variants.map((v) => v.current_price).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
};

/**
 * Returns the highest `old_price` across all variants.
 *
 * @param variants Array of product variants.
 * @returns Highest old price as `number`, or `null` if no old prices exist.
 */
export const getMaxOldPrice = (
  variants: ProductWithRelations['product_variants']
): number | null => {
  const prices = variants.map((v) => v.old_price).filter((p): p is number => p !== null);
  return prices.length ? Math.max(...prices) : null;
};

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

/**
 * Returns the variant with the lowest `current_price`.
 *
 * @param variants Array of product variants.
 * @returns Variant object with the cheapest price, or `null` if none have a price.
 */
export const getMinPriceVariant = (
  variants: ProductWithRelations['product_variants']
): ProductWithRelations['product_variants'][number] | null => {
  const priced = variants.filter((v) => v.current_price !== null);
  if (priced.length === 0) return null;

  return priced.reduce((cheapest, current) =>
    current.current_price! < cheapest.current_price! ? current : cheapest
  );
};
