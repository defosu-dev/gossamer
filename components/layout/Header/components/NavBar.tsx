import Link from 'next/link';

import { cn } from '@/utils/cn';

/**
 * Primary desktop navigation bar displayed in the header.
 *
 * @remarks
 * Renders horizontal navigation links visible on medium screens and larger.
 * All links use Next.js Link for client-side navigation. This is a server component.
 */
export function NavBar() {
  return (
    <nav className={cn('hidden md:block')} aria-label="Primary navigation">
      <ul className={cn('flex items-center gap-8')}>
        <li>
          <Link
            href="/"
            className={cn(
              'text-zinc-600 transition-colors duration-200',
              'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={cn(
              'text-zinc-600 transition-colors duration-200',
              'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
            )}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={cn(
              'font-semibold text-zinc-900 transition-colors duration-200',
              'hover:text-black focus-visible:text-black focus-visible:outline-none'
            )}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
