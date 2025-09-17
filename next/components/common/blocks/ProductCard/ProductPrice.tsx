import React from "react";

type ProductPriceProps = {
  price: number;
};

const ProductPrice = ({ price }: ProductPriceProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <p className="text-2xl font-bold text-gray-900 mt-2 mb-4">
      {formattedPrice}
    </p>
  );
};

export default ProductPrice;
