import React from "react";
import Button from "./Button";

const ProductActions = () => {
  return (
    <div className="flex items-center justify-center">
      <Button variant="secondary">Add to Chart</Button>
      <Button variant="primary">Buy Now</Button>
    </div>
  );
};

export default ProductActions;
