import { cn } from "@/utils/cn";
import formatCurrency from "@/utils/formatCurrency";
import { memo } from "react";

/**
 * Props for price display.
 */
export type CartItemPriceProps = {
  currentPrice: number;
  oldPrice?: number;
  className?: string;
};

/**
 * CartItemPrice — current + optional old price.
 *
 * @component
 * @param {CartItemPriceProps} props
 * @returns {JSX.Element}
 */
const CartItemPrice = memo(
  ({ currentPrice, oldPrice = 0, className = "" }: CartItemPriceProps) => {
    const hasDiscount = oldPrice > currentPrice;

    return (
      <div className={cn("flex flex-col", className)}>
        {hasDiscount && (
          <span className="line-through text-gray-500">
            {formatCurrency(oldPrice)}
          </span>
        )}
        <span className="text-lg font-bold">
          {formatCurrency(currentPrice)}
        </span>
      </div>
    );
  }
);

CartItemPrice.displayName = "CartItemPrice";

export default CartItemPrice;
