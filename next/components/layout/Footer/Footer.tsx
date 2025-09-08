import React from "react";
import Link from "next/link";
import { BadgeInfo } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-1 border border-zinc-300 max-w-6xl mx-auto items-center shadows-sm px-8 rounded-2xl rounded-b-none">
      {/* Верхний блок */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mx-4 md:mx-16 mt-3">
        <div className="flex-1">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready to Get Our New Stuff?
          </h2>

          <div className="bg-white rounded-2xl max-w-82 py-0.4">
            <form className="flex items-center gap-1">
              <input
                type="email"
                placeholder="Your Email"
                className="rounded-full px-4 py-2 text-black"
              />
              <button className="bg-zinc-800 text-white rounded-full px-6 py-1 font-semibold hover:bg-zinc-900 transition-colors">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 max-w-xs">
          <span className="block text-white font-semibold mb-2">
            Gossamer for Homes and Needs
          </span>
          <span className="block text-zinc-200 text-sm">
            We will listen to your needs, identify the best approach, and then
            create a bespoke smart EV charging solution that is right for you.
          </span>
        </div>
      </div>

      {/* Навигационные ссылки и соцсети */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-16 py-8">
        {/* Ссылки */}
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
            <h4 className="text-zinc-800 text-lg font-semibold mb-2">
              Support
            </h4>
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

        {/* Соцсети */}
        <div>
          <span className="block text-zinc-500 mb-2">Social Media</span>
          <div className="flex gap-4">
            <Link href="#">
              <BadgeInfo
                size={28}
                className="text-black hover:text-zinc-600 transition-colors"
              />
            </Link>
            <Link href="#">
              <BadgeInfo
                size={28}
                className="text-black hover:text-zinc-600 transition-colors"
              />
            </Link>
            <Link href="#">
              <BadgeInfo
                size={28}
                className="text-black hover:text-zinc-600 transition-colors"
              />
            </Link>
            <Link href="#">
              <BadgeInfo
                size={28}
                className="text-black hover:text-zinc-600 transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Копирайт и ссылки */}
      <div className="border-t px-4 md:px-16 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
        <span>Copyright © 2025 Grandexh-Defosu. All Rights Reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
