import React from "react";
import ProductImage from "./ProductImage";
import ProductCategoryBadge from "./ProductCategoryBadge";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

type Product = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-sm flex flex-col">
      {/* Фото товара с бейджем категории поверх */}
      <div className="relative flex justify-center">
        <ProductImage src={product.imageSrc} alt={product.imageAlt} />
        <ProductCategoryBadge category={product.category} />
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col flex-grow h-full">
        {/* Название */}
        <div className="mb-2 min-h-[48px]">
          <ProductTitle title={product.name} />
        </div>
        {/* Рейтинг и цена */}
        <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
          <span>
            ⭐ {product.rating.toFixed(1)} ({product.reviewCount} Reviews)
          </span>
          <ProductPrice price={product.price} />
        </div>
        <div className="mt-auto">
          <ProductActions />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
