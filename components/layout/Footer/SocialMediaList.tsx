import Link from 'next/link';

import { cn } from '@/utils/cn';
import InstagramMediaIcon from "@/components/common/icons/InstagramMediaIcon";
import YoutubeMediaIcon from "@/components/common/icons/YoutubeMediaIcon";
import FacebookMediaIcon from "@/components/common/icons/FacebookMediaIcon";
import WhatsappMediaIcon from "@/components/common/icons/WhatsappMediaIcon";

/**
 * Footer section displaying links to the company's official social media profiles.
 *
 * @remarks
 * Renders a group of accessible social media icons with proper hover states and semantic labeling.
 * Remains a server component — all icons are static SVG elements from lucide-react.
 */
export function SocialMediaList() {
  return (
    <div className="text-center md:text-left">
      <span className={cn('mb-3 block text-sm font-medium text-zinc-600')}>Social Media</span>

      <div className={cn('flex justify-center gap-5 md:justify-end')}>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Instagram profile"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
           <InstagramMediaIcon />
        </Link>

        <Link
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our YouTube channel"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
          <YoutubeMediaIcon />
        </Link>

        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook profile"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
           <FacebookMediaIcon />
        </Link>

        <Link
          href="https://whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our whatsapp channel"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
           <WhatsappMediaIcon />
        </Link>
      </div>
    </div>
  );
}

export default SocialMediaList;
