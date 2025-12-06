'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { useCart } from '@/hooks/useCart';
import { to } from '@/config/routes';
import type { ProductCardDTO } from '@/types/api';

// Імпорти ваших під-компонентів (переконайтеся, що вони теж оновлені під пропси)
import ProductImage from './ProductImage';
import ProductCategoryBadge from './ProductCategoryBadge';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';

interface ProductCardProps {
  product?: ProductCardDTO; // Може бути undefined при завантаженні
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
    // В API ми маємо додати defaultVariantId в DTO,
    // інакше тут доведеться переходити на сторінку товару.
    // Припустимо, що product.id це і є variantId для спрощення,
    // АБО (краще) в DTO приходить defaultVariantId.
    const variantIdToAdd = (product as any).defaultVariantId || product.id;

    addItem({
      id: crypto.randomUUID(), // Локальний ID для Zustand
      variantId: variantIdToAdd,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      attributesDescription: 'Default', // Можна покращити, якщо API поверне
    });
  };

  // Розрахунок знижки (можна винести в utils)
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <div
      className={cn(
        'group flex h-full max-w-sm flex-col overflow-hidden rounded-lg border border-transparent bg-white transition-all duration-300 hover:border-gray-100 hover:shadow-lg',
        className
      )}
    >
      {/* Upper Part: Image & Badges (Link to Details) */}
      <Link href={to.product(product.slug)} className="relative block p-1">
        <ProductImage src={product.imageUrl ?? ''} alt={product.title} priority={priority} />
        {product.category && <ProductCategoryBadge>{product.category.name}</ProductCategoryBadge>}
      </Link>

      {/* Body */}
      <div className="flex flex-grow flex-col p-4">
        {/* Title */}
        <Link href={to.product(product.slug)} className="mb-2 block">
          <h3 className="hover:text-primary line-clamp-2 text-lg font-medium text-gray-900 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating & Price */}
        <div className="mt-auto mb-4 flex items-end justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-900">{product.rating}</span>
            <span className="ml-1">({product.reviewsCount})</span>
          </div>

          <ProductPrice
            price={product.price}
            oldPrice={product.oldPrice ?? undefined}
            // Ваші компоненти ProductPrice самі мають вирішувати, як це малювати,
            // але ми передаємо вже готові цифри.
          />
        </div>

        {/* Actions */}
        <div className="mt-auto border-t border-gray-50 pt-2">
          <ProductActions onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
