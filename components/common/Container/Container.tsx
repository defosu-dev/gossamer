import { cn } from '@/utils/cn';
import { IContainer } from './types';
import React from 'react';

/**
 * A container component with flexbox alignment.
 * @param children - The content to be rendered inside the container.
 * @param className - Additional CSS classes to apply.
 * @param xCenter - Centers content horizontally (sets margin to auto).
 * @param justifyContent - Flexbox justify-content property.
 * @param alignItems - Flexbox align-items property.
 */
const Container = ({
  children,
  className = '',
  xCenter = true,
  justifyContent = 'start',
  alignItems = 'start',
}: IContainer) => {
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
};

export default Container;
