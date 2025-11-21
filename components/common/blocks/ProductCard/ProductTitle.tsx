import { cn } from '@/utils/cn';

interface ProductTitleProps {

  /** Product title text */
  title: string;
}

/**
 * @remarks
 * Renders product title in a single line with clamping.
 * - Styles: `line-clamp-1 h-full text-lg font-semibold text-gray-900`.
 */
export function ProductTitle({ title }: ProductTitleProps) {
  return <h3 className={cn('line-clamp-1 h-full text-lg font-semibold text-gray-900')}>{title}</h3>;
}

export default ProductTitle;
