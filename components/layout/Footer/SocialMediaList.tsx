import React from 'react';
import Link from 'next/link';

import { BadgeInfo } from 'lucide-react';
const SocialMediaList = () => {
  return (
    <div>
      <span className="mb-2 block text-zinc-500">Social Media</span>
      <div className="flex gap-4">
        <Link href="#">
          <BadgeInfo size={28} className="text-black transition-colors hover:text-zinc-600" />
        </Link>
        <Link href="#">
          <BadgeInfo size={28} className="text-black transition-colors hover:text-zinc-600" />
        </Link>
        <Link href="#">
          <BadgeInfo size={28} className="text-black transition-colors hover:text-zinc-600" />
        </Link>
        <Link href="#">
          <BadgeInfo size={28} className="text-black transition-colors hover:text-zinc-600" />
        </Link>
      </div>
    </div>
  );
};

export default SocialMediaList;
