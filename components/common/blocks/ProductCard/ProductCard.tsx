"use client";
import React from "react";
import ProductImage from "./ProductImage";
import ProductCategoryBadge from "./ProductCategoryBadge";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";
import { hasDiscount, getMinPriceVariant } from "@/utils/price";
import type { ProductWithRelations } from "@/types/IProductsWithRelations";
import { Star } from "lucide-react";


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
      <div className="bg-white rounded-lg overflow-hidden max-w-sm flex flex-col animate-pulse">
        <div className="relative p-1">
          <div className="w-full aspect-square bg-gray-200 rounded-lg" />
          <div className="absolute top-2 right-2 h-6 w-20 bg-gray-300 rounded-full" />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="h-7 w-3/4 bg-gray-300 rounded" />
          <div className="flex justify-between items-end mb-4 mt-auto">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="flex flex-col items-end gap-2">
              <div className="h-5 w-14 bg-gray-300 rounded" />
              <div className="h-7 w-16 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-auto">
            <div className="h-[42px] w-1/2 bg-gray-300 rounded-full" />
            <div className="h-[42px] w-1/2 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const minPriceVariant = getMinPriceVariant(product.product_variants ?? []);
  const defaultVariant = product.product_variants[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-sm flex flex-col hover:shadow-md transition-shadow">
      <div className="relative p-1">
        <ProductImage
          src={minPriceVariant?.product_images[0].url ?? ""}
          alt={minPriceVariant?.product_images[0].alt ?? ""}
          priority={priority}
        />
        <ProductCategoryBadge>{product.category?.name}</ProductCategoryBadge>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <ProductTitle title={product.title} />
        <div className="flex h-full items-end justify-between text-gray-600 text-sm mb-4 mt-auto">
          <span><Star className="text-amber-300 w-5 h-5 mr-1" /> 4.8 (18 Reviews)</span>
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
          <ProductActions
            variantId={minPriceVariant?.id ?? defaultVariant.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
