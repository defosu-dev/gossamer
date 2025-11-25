import Link from 'next/link';

import { cn } from '@/utils/cn';
import LogoIcon from '@/components/common/LogoIcon';

interface LogoProps {
  /** Controls visibility of the text label next to the icon */
  showText?: boolean;
}

/**
 * Brand logo component with an optional text label. Clicking navigates to the homepage.
 *
 * @remarks
 * This is a server component. The LogoIcon is expected to be a pure SVG/presentation component.
 * No client-side state or interactivity is managed here — navigation is handled natively
 * by Next.js Link.
 */
export function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2.5 transition-opacity',
        'rounded-md hover:opacity-80 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
      )}
      aria-label="Gossamer – Go to homepage"
    >
      <LogoIcon className="h-8 w-8" />
      {showText && <span className={cn('text-xl font-bold text-black')}>Gossamer</span>}
    </Link>
  );
}

export default Logo;
