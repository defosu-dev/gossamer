import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

const SideBar = () => {
  const cartItemCount = 1;
  return (
    <div className="flex items-center gap-6">
      <button className="w-9 h-9 flex justify-center items-center rounded-full border border-neutral-300">
        <Search className="size-4.5 text-gray-700" />
      </button>

      <button className="relative w-9 h-9 flex justify-center items-center rounded-full border border-neutral-300">
        <ShoppingCart className="size-4.5 text-gray-700" />
        {cartItemCount > 0 && (
          <div className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-500 w-4 h-4 ring ring-white">
            <span className="text-[10px] text-red-100 font-medium">{cartItemCount}</span>
          </div>
        )}
      </button>

      <div className="w-9 h-9 overflow-hidden rounded-full border border-neutral-300">
        <ImageWithFallback src="https://via.placeholder.com/36" alt="User Avatar" />
      </div>
    </div>
  );
};

export default SideBar;
