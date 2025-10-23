import React from "react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import Cart from "./Cart/Cart";

const SideBar = () => {
  return (
    <div className="flex items-center gap-6">
      <button className="w-9 h-9 flex justify-center items-center rounded-full border border-neutral-300">
        <Search className="size-4.5 text-gray-700" />
      </button>

      <Cart />

      <div className="w-9 h-9 overflow-hidden rounded-full border border-neutral-300">
        <ImageWithFallback src="https://via.placeholder.com/36" alt="User Avatar" />
      </div>
    </div>
  );
};

export default SideBar;
