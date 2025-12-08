'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';
import Button from '@/components/ui/Button';

interface ProductActionsProps {
  onAddToCart: () => void;
  className?: string;
  isCompact?: boolean;
}

export function ProductActions({ onAddToCart, className, isCompact = false }: ProductActionsProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    onAddToCart();
    router.push(to.checkout());
  };

  const handleAddToCart = () => {
    onAddToCart();
  };

  if (isCompact) {
    return (
      <Button variant="secondary" className={cn('w-full', className)} onClick={handleAddToCart}>
        <ShoppingBag className="mr-2 h-4 w-4" /> Add
      </Button>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="secondary"
        className="flex-1"
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        Add to Cart
      </Button>
      <Button variant="primary" className="flex-1" onClick={handleBuyNow} aria-label="Buy now">
        Buy Now
      </Button>
    </div>
  );
}

export default ProductActions;
