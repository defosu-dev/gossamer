'use client';

import type { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: keyof typeof to | string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  href,
  children,
  className = cn(
    'text-zinc-600 transition-colors duration-200',
    'hover:text-black focus-visible:text-black focus-visible:outline-none'
  ),
  activeClassName = cn('font-bold text-zinc-900'),
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href ? true : false;

  return (
    <Link href={href} className={cn(className, isActive ? activeClassName : '')}>
      {children}
    </Link>
  );
}
