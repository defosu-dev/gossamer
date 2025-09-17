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
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm flex flex-col">
      {/* Верхний блок с бейджем категории */}
      <div className="relative p-2 flex justify-end">
        <ProductCategoryBadge category={product.category} />
      </div>
      {/* Фото товара */}
      <div className="flex justify-center">
        <ProductImage src={product.imageSrc} alt={product.imageAlt} />
      </div>
      {/* Контент */}{" "}
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

        {/* Кнопки прижаты к низу */}
        <div className="mt-auto">
          <ProductActions />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
