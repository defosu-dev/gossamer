import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

/**
 * Footer navigation section containing two link groups: "About" and "Support".
 *
 * @remarks
 * Renders static navigation links with hover transitions. All interactivity is handled
 * natively by Next.js Link component. This is a server component.
 */
export function List() {
  return (
    <nav className={cn('mb-6 flex gap-16 md:mb-0')} aria-label="Footer navigation">
      {/* About Section */}
      <div>
        <h4 className={cn('mb-3 text-sm font-semibold tracking-wider text-zinc-600 uppercase')}>
          About
        </h4>
        <ul className={cn('space-y-2')}>
          <li>
            <Link
              href={to.blog()}
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Meet The Team
            </Link>
          </li>
          <li>
            <Link
              href={to.contactUs()}
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Support Section */}
      <div>
        <h4 className={cn('mb-3 text-sm font-semibold tracking-wider text-zinc-600 uppercase')}>
          Support
        </h4>
        <ul className={cn('space-y-2')}>
          <li>
            <Link
              href={to.contactUs()}
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href={to.faq()}
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Shipping
            </Link>
          </li>
          <li>
            <Link
              href="/returns"
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              Returns
            </Link>
          </li>
          <li>
            <Link
              href={to.faq()}
              className={cn(
                'text-zinc-500 transition-colors duration-200',
                'hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none'
              )}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default List;
