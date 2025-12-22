'use client';
import type { ProductCardDTO } from '@/types/api';
import ProductCard from '@/components/modules/ProductCard/ProductCard';
import ProductGridEmpty from './ProductGridEmpty';
import { cn } from '@/lib/utils/cn';

interface ProductGridProps {
  productList?: ProductCardDTO[];
  className?: string;
}

export function ProductGrid({ productList = [], className }: ProductGridProps) {
  if (!productList || productList.length === 0) {
    return <ProductGridEmpty />;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {productList.slice(0, 6).map((product) => (
        <ProductCard key={product.defaultVariantId} product={product} priority={true} />
      ))}

      {productList.slice(6).map((product) => (
        <ProductCard key={product.defaultVariantId} product={product} priority={false} />
      ))}
    </div>
  );
}
