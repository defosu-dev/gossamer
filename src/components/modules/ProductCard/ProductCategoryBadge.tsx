import { to } from '@/config/routes';
import Badge from '@/components/ui/Badge';

interface ProductCategoryBadgeProps {
  children: React.ReactNode;
}

/**
 * @remarks
 * Displays a category badge on a product card.
 * Positioned absolutely in the top-right corner.
 */
export default function ProductCategoryBadge({ children }: ProductCategoryBadgeProps) {
  return (
    <Badge as="link" href={to.products()} className="absolute top-2 right-2">
      {children}
    </Badge>
  );
}
