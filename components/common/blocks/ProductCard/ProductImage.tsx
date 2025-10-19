import React from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

type ProductImageProps = {
  src: string;
  alt: string;
};

const ProductImage = ({ src, alt }: ProductImageProps) => {
  return (
    <div className="relative w-full aspect-square bg-zinc-200 rounded-t-lg">
      <ImageWithFallback src={src} alt={alt} iconSize={6}  />
    </div>
  );
};

export default ProductImage;
