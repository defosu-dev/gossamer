import React from "react";
import Link from "next/link";

import { BadgeInfo, InstagramIcon, Youtube, YoutubeIcon } from "lucide-react";
const SocialMediaList = () => {
  return (
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
        <YoutubeIcon />
        <InstagramIcon />
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
  );
};

export default SocialMediaList;
