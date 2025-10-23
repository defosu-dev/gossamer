import React from "react";
import Link from "next/link";

const Copyright = () => {
  return (
    <div className="border-t px-4 md:px-16 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
      <span>Copyright © 2025 Grandexh-Defosu. All Rights Reserved.</span>
      <div className="flex gap-4 mt-2 md:mt-0">
        <Link href="#" className="hover:text-black transition">
          Terms of Service
        </Link>
        <a href="#" className="hover:text-black transition">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Copyright;
