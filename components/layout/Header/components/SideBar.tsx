import React from "react";
import { Search, UserRound } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import Cart from "./Cart/Cart";
import { cn } from "@/utils/cn";
import Link from "next/link";

const SideBar = () => {
  const isAuth = false;
  return (
    <div className="flex items-center gap-6">
      <button className="w-9 h-9 flex justify-center items-center rounded-full border border-neutral-300">
        <Search className="size-4.5 text-gray-700" />
      </button>

      <Cart />

      <div className={cn(
        "w-9 h-9 overflow-hidden rounded-full border border-neutral-300",
        "flex justify-center items-center",
      )}>
        {isAuth ?
          <ImageWithFallback src="https://via.placeholder.com/36" alt="User Avatar" />
          :
          <Link href="/auth/sign-in" className={cn(
            "h-full w-full",
            "flex justify-center items-center",
          )}>
            <UserRound className="size-4.5 text-gray-700" />
          </Link>
        }
      </div>
    </div>
  );
};

export default SideBar;
