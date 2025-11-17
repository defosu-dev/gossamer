import React from 'react';
import Link from 'next/link';

const Copyright = () => {
  return (
    <div className="flex flex-col items-center justify-between border-t px-4 py-4 text-sm text-zinc-400 md:flex-row md:px-16">
      <span>Copyright © 2025 Grandexh-Defosu. All Rights Reserved.</span>
      <div className="mt-2 flex gap-4 md:mt-0">
        <Link href="#" className="transition hover:text-black">
          Terms of Service
        </Link>
        <a href="#" className="transition hover:text-black">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Copyright;
