import React from 'react';
import { Search } from 'lucide-react';
import User from './User';
import Cart from '@/components/common/blocks/Cart';

const SideBar = () => {
  return (
    <div className="flex items-center gap-6">
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300">
        <Search className="size-4.5 text-gray-700" />
      </button>

      <Cart />

      <User />
    </div>
  );
};

export default SideBar;
