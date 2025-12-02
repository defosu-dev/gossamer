import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';
import { NavLink } from '@/components/ui/NavLink';

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
          <NavLink href={to.home()}>Home</NavLink>
        </li>
        <li>
          <NavLink href={to.products()}>Shop</NavLink>
        </li>
        <li>
          <NavLink href={to.blog()}>Blog</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
