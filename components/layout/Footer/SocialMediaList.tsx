import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * Footer section displaying links to the company's official social media profiles.
 *
 * @remarks
 * Renders a group of accessible social media icons with proper hover states and semantic labeling.
 * Remains a server component — all icons are static SVG elements from lucide-react.
 */
export function SocialMediaList() {
  return (
    <div className="text-center md:text-right">
      <span className={cn('mb-3 block text-sm font-medium text-zinc-600')}>Follow us</span>

      <div className={cn('flex justify-center gap-5 md:justify-end')}>
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
          <Facebook size={24} strokeWidth={1.5} />
        </Link>

        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our X/Twitter profile"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
          <Twitter size={24} strokeWidth={1.5} />
        </Link>

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
          <Instagram size={24} strokeWidth={1.5} />
        </Link>

        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our LinkedIn page"
          className={cn(
            'text-zinc-700 transition-all duration-200',
            'rounded hover:scale-110 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
          )}
        >
          <Linkedin size={24} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

export default SocialMediaList;
