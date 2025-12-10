import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  /** Content to render inside the container */
  children: ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Centers content horizontally */
  xCenter?: boolean;

  /** Flexbox justify-content property (start, center, end, between, around, evenly) */
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /** Flexbox align-items property (start, center, end, stretch, baseline) */
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
}

/**
 * @remarks
 * A container component with flexbox alignment.
 * - Uses a max width of 7xl and horizontal padding.
 * - Supports optional horizontal centering, justify-content, and align-items.
 */
export function Container({
  children,
  className = '',
  xCenter = true,
  justifyContent = 'start',
  alignItems = 'start',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'container flex w-full max-w-7xl px-4',
        {
          'mx-auto': xCenter,
          [`justify-${justifyContent}`]: justifyContent,
          [`items-${alignItems}`]: alignItems,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
