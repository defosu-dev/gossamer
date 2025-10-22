import React from "react";

type ProductCategoryBadgeProps = {
  category: string;
};

const ProductCategoryBadge = ({ category }: ProductCategoryBadgeProps) => {
  return (
    <div className="absolute top-2 right-2 px-2 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-md">
      {category}
    </div>
  );
};

export default ProductCategoryBadge;
