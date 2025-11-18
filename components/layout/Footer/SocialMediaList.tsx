import React from "react";
import Link from "next/link";

import { BadgeInfo, InstagramIcon, Youtube, YoutubeIcon } from "lucide-react";
import InstagramMediaIcon from "@/components/common/icons/InstagramMediaIcon";
import YoutubeMediaIcon from "@/components/common/icons/YoutubeMediaIcon";
import FacebookMediaIcon from "@/components/common/icons/FacebookMediaIcon";
import WhatsappMediaIcon from "@/components/common/icons/WhatsappMediaIcon";
const SocialMediaList = () => {
  return (
    <div>
      <span className="block text-zinc-500 mb-2">Social Media</span>
      <div className="flex gap-4">
        <Link href="#">
          <InstagramMediaIcon />
        </Link>

        <Link href="#">
          <YoutubeMediaIcon />
        </Link>
        <Link href="#">
          <FacebookMediaIcon />
        </Link>
        <Link href="#">
          <WhatsappMediaIcon />
        </Link>
      </div>
    </div>
  );
};

export default SocialMediaList;
