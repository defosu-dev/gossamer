// blocks/ProductCard/ProductCard.tsx
import React from "react";
import ProductImage from "./ProductImage";
import ProductCategoryBadge from "./ProductCategoryBadge";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

type Product = {
  id: string;
  name: string;
  imageSrc: string; //
  imageAlt: string; //
  category: string;
  rating: number; //
  reviewCount: number;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl                overflow-hidden w-full max-w-sm mx-auto my-8 transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <ProductImage /> {/*доработать путь к фото*/}
        <ProductCategoryBadge category={product.category} />
      </div>
      <div className="p-5">
        <ProductTitle title={product.name} />
        <div>Rating 55</div> {/*доработать рейтинги */}
        <ProductPrice price={product.price} />
        <ProductActions />
      </div>
    </div>
  );
};

export default ProductCard;
