'use client';
import React from 'react';
import ProductImage from './ProductImage';
import ProductCategoryBadge from './ProductCategoryBadge';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';
import { hasDiscount, getMinPriceVariant } from '@/utils/price';
import type { ProductWithRelations } from '@/types/IProductsWithRelations';
import { Star } from 'lucide-react';

/**
 * Product card with primary image, price (min + discount), category badge, and actions.
 *
 * @param product  - Full product with variants, images, and category.
 * @param priority - Set `true` for LCP images (first 3–6 cards). Improves Lighthouse score.
 * @param isLoading - Set `true` to display a loading skeleton.
 */
const ProductCard = ({
  product,
  priority = false,
  isLoading = false,
}: {
  product?: ProductWithRelations;
  priority?: boolean;
  isLoading?: boolean;
}) => {
  if (isLoading || !product) {
    return (
      <div className="flex max-w-sm animate-pulse flex-col overflow-hidden rounded-lg bg-white">
        <div className="relative p-1">
          <div className="aspect-square w-full rounded-lg bg-gray-200" />
          <div className="absolute top-2 right-2 h-6 w-20 rounded-full bg-gray-300" />
        </div>

        <div className="flex flex-grow flex-col p-4">
          <div className="h-7 w-3/4 rounded bg-gray-300" />
          <div className="mt-auto mb-4 flex items-end justify-between">
            <div className="h-5 w-24 rounded bg-gray-300" />
            <div className="flex flex-col items-end gap-2">
              <div className="h-5 w-14 rounded bg-gray-300" />
              <div className="h-7 w-16 rounded bg-gray-300" />
            </div>
          </div>
          <div className="mt-auto flex justify-between gap-2">
            <div className="h-[42px] w-1/2 rounded-full bg-gray-300" />
            <div className="h-[42px] w-1/2 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    );
  }

  const minPriceVariant = getMinPriceVariant(product.product_variants ?? []);
  const defaultVariant = product.product_variants[0];

  return (
    <div className="flex max-w-sm flex-col overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-md">
      <div className="relative p-1">
        <ProductImage
          src={minPriceVariant?.product_images[0].url ?? ''}
          alt={minPriceVariant?.product_images[0].alt ?? ''}
          priority={priority}
        />
        <ProductCategoryBadge>{product.category?.name}</ProductCategoryBadge>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <ProductTitle title={product.title} />
        <div className="mt-auto mb-4 flex h-full items-end justify-between text-sm text-gray-600">
          <span>
            <Star className="mr-1 h-5 w-5 text-amber-300" /> 4.8 (18 Reviews)
          </span>
          <ProductPrice
            minPrice={minPriceVariant?.current_price ?? 0}
            maxOldPrice={minPriceVariant?.old_price}
            showDiscount={hasDiscount(
              minPriceVariant?.current_price ?? null,
              minPriceVariant?.old_price ?? null
            )}
          />
        </div>
        <div className="mt-auto">
          <ProductActions variantId={minPriceVariant?.id ?? defaultVariant.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
