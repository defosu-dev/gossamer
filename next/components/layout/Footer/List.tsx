import React from "react";
import Link from "next/link";

const List = () => {
  return (
    <div className="flex gap-16 mb-6 md:mb-0">
      <div>
        <h4 className="text-zinc-800 text-lg font-semibold mb-2">About</h4>
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Meet The Team
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-zinc-800 text-lg font-semibold mb-2">Support</h4>
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Shipping
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              Return
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-zinc-500 hover:text-black transition-colors"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default List;
