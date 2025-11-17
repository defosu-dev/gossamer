import { cn } from '@/utils/cn';
import Link, { LinkProps } from 'next/link';
import { IChildren } from '@/types/IChildren';

type BadgeBase = { className?: string } & IChildren;

type BadgeProps =
  | ({ as?: 'span' } & React.HTMLAttributes<HTMLSpanElement> & BadgeBase)
  | ({ as: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement> & BadgeBase)
  | ({ as: 'link'; href: string } & LinkProps & BadgeBase);

/**
 * Badge
 *
 * A versatile, reusable component that can render as a span, button, or Next.js Link.
 * It automatically applies base styling, rounded borders, shadow, and optional cursor-pointer for interactive elements.
 *
 * Variants:
 * - span  : simple text container (default)
 * - button: clickable button with all HTMLButtonElement props
 * - link  : Next.js Link with href and all LinkProps
 *
 * Props:
 * @param as        - Determines the type of element to render: "span" | "button" | "link" (default: "span")
 * @param children  - The content inside the Badge (required)
 * @param className - Optional additional CSS classes
 * @param href      - Required if `as="link"`, URL for the Next.js Link
 * @param ...rest   - All other HTML attributes relevant to the chosen element type:
 *                   - span  -> React.HTMLAttributes<HTMLSpanElement>
 *                   - button -> React.ButtonHTMLAttributes<HTMLButtonElement>
 *                   - link -> LinkProps
 *
 * Usage examples:
 * <Badge>Default span</Badge>
 * <Badge as="button" onClick={handleClick}>Click me</Badge>
 * <Badge as="link" href="/about" target="_blank" rel="noopener">Go to About</Badge>
 */

export const Badge = (props: BadgeProps) => {
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
};
