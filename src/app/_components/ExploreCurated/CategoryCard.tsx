'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { to } from '@/config/routes';
import type { CategoryDTO } from '@/types/api';

interface CategoryCardProps {
  category: CategoryDTO;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={to.products() + `?category=${category.slug}`}
      className="group relative h-110 w-120 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <ImageWithFallback src={category.imageUrl ?? ''} alt={category.name} iconSize={10} />
      <div className="absolute bottom-3 left-3">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">
          {category.name}
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
