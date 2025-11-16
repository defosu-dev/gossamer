import React from "react";
import Button from "../../Button";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

type ProductActionsProps = {
  variantId: string;
};

const ProductActions = ({ variantId }: ProductActionsProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(variantId);
  };

  const handleBuyNow = () => {
    addToCart(variantId);
    router.push("/checkout");
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="secondary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Button variant="primary" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
