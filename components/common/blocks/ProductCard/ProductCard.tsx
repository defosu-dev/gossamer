"use client";
import React from "react";
import ProductImage from "./ProductImage";
import ProductCategoryBadge from "./ProductCategoryBadge";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";
import { getMinPrice, getMaxOldPrice, hasDiscount } from "@/utils/price";
import { getPrimaryImage } from "@/utils/image";
import type { ProductWithRelations } from "@/types/IProductsWithRelations";

/**
 * Product card with primary image, price (min + discount), category badge, and actions.
 *
 * @param product  - Full product with variants, images, and category.
 * @param priority - Set `true` for LCP images (first 3–6 cards). Improves Lighthouse score.
 */
const ProductCard = ({
  product,
  priority = false,
}: {
  product: ProductWithRelations;
  priority?: boolean;
}) => {
  const variants = product.product_variants ?? [];

  // 1. Primary image (sorted by position)
  const img = getPrimaryImage(variants);
  const src = img?.url ?? "/";
  const alt = img?.alt ?? product.title;

  // 2. Price logic
  const min = getMinPrice(variants);
  const old = getMaxOldPrice(variants);
  const discount = hasDiscount(min, old);

  // 3. Category
  const category = product.category?.name ?? "Uncategorized";

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-sm flex flex-col hover:shadow-md transition-shadow">
      <div className="relative p-1">
        <ProductImage src={src} alt={alt} priority={priority} />
        <ProductCategoryBadge>{category}</ProductCategoryBadge>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <ProductTitle title={product.title} />
        <div className="flex h-full items-end justify-between text-gray-600 text-sm mb-4 mt-auto">
          <span>⭐ 4.8 (18 Reviews)</span>
          <ProductPrice
            minPrice={min}
            maxOldPrice={old}
            showDiscount={discount}
          />
        </div>
        <div className="mt-auto">
          <ProductActions />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
