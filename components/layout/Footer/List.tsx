import React from 'react';
import Link from 'next/link';

const List = () => {
  return (
    <div className="mb-6 flex gap-16 md:mb-0">
      <div>
        <h4 className="mb-2 text-lg font-semibold text-zinc-800">About</h4>
        <ul className="space-y-1">
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Blog
            </Link>
          </li>
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Meet The Team
            </Link>
          </li>
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold text-zinc-800">Support</h4>
        <ul className="space-y-1">
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Shipping
            </Link>
          </li>
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              Return
            </Link>
          </li>
          <li>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-black">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default List;
