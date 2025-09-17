import React from "react";

type ProductTitleProps = {
  title: string;
};

const ProductTitle = ({ title }: ProductTitleProps) => {
  return (
    <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
  );
};

export default ProductTitle;
