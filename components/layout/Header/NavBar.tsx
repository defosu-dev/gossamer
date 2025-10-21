import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
