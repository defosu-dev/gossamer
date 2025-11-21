import { Badge } from '@/components/common/Badge';
import type { IChildren } from '@/types/IChildren';

/**
 * @remarks
 * Displays a category badge on a product card.
 * Positioned absolutely in the top-right corner.
 */
export function ProductCategoryBadge({ children }: IChildren) {
  return (
    <Badge as="link" href="#" className="absolute top-2 right-2">
      {children}
    </Badge>
  );
}

export default ProductCategoryBadge;
