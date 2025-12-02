'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

import Button from '../../ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import { to } from '@/config/routes';

interface ProductActionsProps {
  /** Variant ID of the product */
  variantId: string;

  /** Optional additional class names */
  className?: string;
}

/**
 * ProductActions.
 *
 * @remarks
 * Renders "Add to Cart" and "Buy Now" buttons for a product variant.
 * Integrates with useCart hook and Next.js router for navigation.
 * Client component due to useCart and useRouter usage.
 */
export function ProductActions({ variantId, className }: ProductActionsProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(variantId);
  };

  const handleBuyNow = () => {
    addToCart(variantId);
    router.push(to.checkout());
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Button variant="secondary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Button variant="primary" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </div>
  );
}

export default ProductActions;
