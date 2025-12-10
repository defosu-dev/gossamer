'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { useCart } from '@/hooks/useCart';
import { to } from '@/config/routes';
import type { ProductCardDTO } from '@/types/api';

import ProductImage from './ProductImage';
import ProductCategoryBadge from './ProductCategoryBadge';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';

interface ProductCardProps {
  product?: ProductCardDTO;
  isLoading?: boolean;
  priority?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  isLoading = false,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();

  // 1. Skeleton State
  if (isLoading || !product) {
    return (
      <div
        className={cn(
          'flex max-w-sm animate-pulse flex-col overflow-hidden rounded-lg bg-white',
          className
        )}
      >
        <div className="relative p-1">
          <div className="aspect-square w-full rounded-lg bg-gray-200" />
        </div>
        <div className="flex flex-grow flex-col space-y-3 p-4">
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="flex items-end justify-between">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
          <div className="mt-auto flex gap-2 pt-4">
            <div className="h-10 w-full rounded bg-gray-200" />
            <div className="h-10 w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Logic
  const handleAddToCart = () => {
    const variantIdToAdd = product.defaultVariantId;

    if (!variantIdToAdd) {
      console.error('No variant ID found for product:', product.title);
      return;
    }
    addItem({
      id: variantIdToAdd,
      variantId: variantIdToAdd,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      oldPrice: product.oldPrice ?? null,
      imageUrl: product.imageUrl,
      quantity: 1,
      attributesDescription: '',
    });
  };

  return (
    <div
      className={cn(
        'group flex h-full max-w-sm flex-col overflow-hidden rounded-lg border border-transparent bg-white p-1 transition-all duration-300 hover:border-gray-100 hover:shadow-lg',
        className
      )}
    >
      {/* Upper Part: Image & Badges (Link to Details) */}
      <div className="relative block">
        <Link href={to.product(product.slug)}>
          <ProductImage src={product.imageUrl ?? ''} alt={product.title} priority={priority} />
        </Link>
        {product.category && <ProductCategoryBadge>{product.category.name}</ProductCategoryBadge>}
      </div>

      {/* Body */}
      <div className="flex h-full flex-grow flex-col p-2">
        {/* Title */}
        <Link href={to.product(product.slug)} className="mb-2 block">
          <h3 className="hover:text-primary line-clamp-2 text-lg font-medium text-gray-900 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating & Price */}
        <div className="mt-auto mb-2 flex items-end justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="mr-1 size-5 text-amber-400" />
            <span className="font-medium text-gray-900">{product.rating}</span>
            <span className="ml-1">({product.reviewsCount} Reviews)</span>
          </div>

          <ProductPrice price={product.price} oldPrice={product.oldPrice ?? undefined} />
        </div>

        {/* Actions */}
        <div className="pt-2">
          <ProductActions onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
