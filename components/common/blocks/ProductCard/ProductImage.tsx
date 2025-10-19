import React from "react";

type ProductImageProps = {
  src: string;
  alt: string;
};

const ProductImage = ({ src, alt }: ProductImageProps) => {
  return (
    <div className="relative w-full aspect-square bg-zinc-200 rounded-t-lg">
      {/* Здесь можно разместить placeholder или иконку, если нужно */}
    </div>
  );
};

export default ProductImage;
