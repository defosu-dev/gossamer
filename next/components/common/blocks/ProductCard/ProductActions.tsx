import React from "react";
import Button from "./Button";

const ProductActions = () => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="secondary">Add to Chart</Button>
      <Button variant="primary">Buy Now</Button>
    </div>
  );
};

export default ProductActions;
