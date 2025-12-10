import Link, { type LinkProps } from 'next/link';
import React, { type ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BadgeBase = { className?: string; children: ReactNode };

type BadgeProps =
  | ({ as?: 'span' } & React.HTMLAttributes<HTMLSpanElement> & BadgeBase)
  | ({ as: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement> & BadgeBase)
  | ({ as: 'link'; href: string } & LinkProps & BadgeBase);

/**
 * Badge component.
 *
 * @remarks
 * A versatile component that can render as a span, button, or Next.js Link.
 * Applies base styling, rounded borders, shadow, and optional cursor-pointer for interactive elements.
 */
export function Badge(props: BadgeProps) {
  const { as = 'span', children, className, ...rest } = props;
  const classes = cn(
    'px-2 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-md w-fit',
    as !== 'span' && 'cursor-pointer',
    className
  );

  if (as === 'link') {
    const { href, ...linkRest } = rest as LinkProps & { href: string };
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  if (as === 'button') {
    return (
      <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }

  return (
    <span className={classes} {...(rest as React.HTMLAttributes<HTMLSpanElement>)}>
      {children}
    </span>
  );
}

export default Badge;
