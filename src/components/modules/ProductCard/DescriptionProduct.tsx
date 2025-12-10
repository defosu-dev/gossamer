import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface DescriptionProductProps {
  /** Content of the description */
  children: ReactNode;

  /** Optional additional class names */
  className?: string;
}

/**
 * DescriptionProduct.
 *
 * @remarks
 * Renders a product description paragraph with default styling.
 * Fully server-side component, no hooks or client logic needed.
 */
export function DescriptionProduct({ children, className }: DescriptionProductProps) {
  return <p className={cn('mb-8 leading-relaxed text-gray-500', className)}>{children}</p>;
}

export default DescriptionProduct;
