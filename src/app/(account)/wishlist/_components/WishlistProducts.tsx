'use client';

import { Loader2 } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import { WishlistEmpty } from './WishlistEmpty';

export function WishlistProducts() {
  const { data: products, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-neutral-300" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProductGrid productList={products} />
    </div>
  );
}
