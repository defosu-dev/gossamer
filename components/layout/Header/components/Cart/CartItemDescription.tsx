import { cn } from "@/utils/cn";
import { memo } from "react";

/**
 * Props for attribute list.
 */
export type CartItemDescriptionProps = {
  items: { label: string; value: string }[];
  className?: string;
};

/**
 * CartItemDescription — renders variant attributes.
 *
 * @component
 * @param {CartItemDescriptionProps} props
 * @returns {JSX.Element | null}
 */
const CartItemDescription = memo(
  ({ items, className = "" }: CartItemDescriptionProps) => {
    if (!items.length) return null;

    return (
      <div
        className={cn(
          "flex gap-4 items-center text-sm text-gray-600",
          className
        )}
      >
        {items.map((item, i) => (
          <div key={`${item.label}-${i}`}>
            {item.label}:{" "}
            <span className="font-semibold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
);

CartItemDescription.displayName = "CartItemDescription";

export default CartItemDescription;
