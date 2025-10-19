import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

const SideBar = () => {
  const cartItemCount = 1;
  return (
    <div className="flex items-center gap-6">
      <button className="p-2">
        <Search className="h-6 w-6 text-gray-700" />
      </button>

      <button className="relative p-2">
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        {cartItemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {cartItemCount}
          </span>
        )}
      </button>

      <div className="h-9 w-9 overflow-hidden rounded-full">
        <ImageWithFallback src="https://via.placeholder.com/36" alt="User Avatar" />
      </div>
    </div>
  );
};

export default SideBar;
