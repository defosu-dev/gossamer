import React from "react";
import { Search } from "lucide-react";
import Cart from "./Cart";
import User from "./User";

const SideBar = () => {
  const isAuth = false;
  return (
    <div className="flex items-center gap-6">
      <button className="w-9 h-9 flex justify-center items-center rounded-full border border-neutral-300">
        <Search className="size-4.5 text-gray-700" />
      </button>

      <Cart />

      <User />
    </div>
  );
};

export default SideBar;
