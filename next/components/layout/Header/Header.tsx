import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Gem } from "lucide-react";

const Header = () => {
  const cartItemCount = 1;

  return (
    <header className="w-full">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between bg-white px-8 py-4 shadow-sm rounded-b-2xl border border-zinc-300"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        {/* Лого */}
        <Link href="/" className="flex items-center gap-2">
          <Gem className="h-6 w-6 text-black" />
          <span className="text-xl font-bold text-black">Gossamer</span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8 text-gray-600">
            <li>
              <Link href="/beranda" className="hover:text-black">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-black">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="font-bold text-black">
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Поиск / корзина / аватар */}
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
            <Image
              src="https://via.placeholder.com/36"
              alt="User Avatar"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
