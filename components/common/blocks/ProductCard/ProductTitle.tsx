import React from 'react';

type ProductTitleProps = {
  title: string;
};

const ProductTitle = ({ title }: ProductTitleProps) => {
  return <h3 className="line-clamp-1 h-full text-lg font-semibold text-gray-900">{title}</h3>;
};

export default ProductTitle;
