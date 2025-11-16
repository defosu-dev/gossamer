import React from "react";

type ProductTitleProps = {
  title: string;
};

const ProductTitle = ({ title }: ProductTitleProps) => {
  return (
    <h3 className="text-lg font-semibold text-gray-900 h-full line-clamp-1">
      {title}
    </h3>
  );
};

export default ProductTitle;
