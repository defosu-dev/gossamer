import React from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";

export default function CartButton({
  open,
  count,
  onClick,
}: {
  open: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={onClick}
      type="button"
      className={cn(
        "relative w-9 h-9 flex justify-center items-center rounded-full",
        "border border-neutral-300 bg-white shadow",
        "transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner "
      )}
    >
      <ShoppingCart className="size-4.5 text-gray-700" />
      {count > 0 && (
        <div className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-500 w-4 h-4 ring ring-white">
          <span className="text-[10px] text-red-100 font-medium">{count}</span>
        </div>
      )}
    </button>
  );
}
