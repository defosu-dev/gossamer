import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface TypographyProps {
  /** Text content to be displayed */
  children: ReactNode;

  /** Visual style variant */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'small' | 'muted';

  /** Optional custom CSS class */
  className?: string;
}

/**
 * Typography component provides consistent text styling across the application
 * using predefined semantic variants.
 *
 * @remarks
 * This is a pure presentational client component optimized for frequent reuse
 * (e.g. in lists, cards, articles). It has no internal state or side effects.
 */
export function Typography({ children, variant = 'p', className }: TypographyProps) {
  const baseStyles = 'antialiased';

  const variants = {
    h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    h5: 'text-lg font-medium tracking-tight',
    h6: 'text-base font-medium tracking-tight text-zinc-600',
    p: 'leading-7 text-base text-zinc-700',
    lead: 'text-xl text-zinc-600 leading-relaxed',
    small: 'text-sm font-medium text-zinc-500',
    muted: 'text-sm text-zinc-500',
  };

  return <div className={cn(baseStyles, variants[variant], className)}>{children}</div>;
}

export default Typography;
