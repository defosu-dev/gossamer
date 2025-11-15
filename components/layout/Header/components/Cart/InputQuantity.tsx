import { cn } from "@/utils/cn";
import { Minus, Plus } from "lucide-react";
import { memo, useCallback } from "react";

/**
 * Props for InputQuantity.
 *
 * @typedef {Object} InputQuantityProps
 * @property {number} quantity - Current value.
 * @property {(newQuantity: number) => void} onChange - Immediate change handler.
 * @property {string} [className] - Additional classes.
 */
export type InputQuantityProps = {
  quantity: number;
  onChange: (newQuantity: number) => void;
  className?: string;
};

/**
 * InputQuantity — + / - quantity control.
 *
 * @component
 * @param {InputQuantityProps} props
 * @returns {JSX.Element}
 */
const InputQuantity = memo(
  ({ quantity, onChange, className }: InputQuantityProps) => {
    const increment = useCallback(
      () => onChange(quantity + 1),
      [quantity, onChange]
    );
    const decrement = useCallback(
      () => onChange(Math.max(1, quantity - 1)),
      [quantity, onChange]
    );

    return (
      <div
        className={cn(
          "flex h-8 rounded-md border border-neutral-300 overflow-hidden bg-neutral-50 shadow",
          className
        )}
      >
        <button
          type="button"
          onClick={decrement}
          aria-label="Decrease quantity"
          className="w-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <Minus className="size-3" />
        </button>

        <span
          className="w-8 flex items-center justify-center text-sm font-semibold"
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={increment}
          aria-label="Increase quantity"
          className="w-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <Plus className="size-3" />
        </button>
      </div>
    );
  }
);

InputQuantity.displayName = "InputQuantity";

export default InputQuantity;
