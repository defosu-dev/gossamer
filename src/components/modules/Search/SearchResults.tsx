'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import formatCurrency from '@/lib/utils/formatCurrency';
import { to } from '@/config/routes';

interface SearchResultItem {
  id: string;
  title: string;
  slug: string;
  current_price: number;
  image_url: string | null;
}

interface SearchResultsProps {
  items: SearchResultItem[];
  onSelect: () => void;
}

export function SearchResults({ items, onSelect }: SearchResultsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col p-2">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={to.product(item.slug)}
            onClick={onSelect}
            className="group flex items-center gap-4 rounded-xl p-2 transition-all duration-200 hover:bg-neutral-100"
          >
            {/* Image */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              <ImageWithFallback
                src={item.image_url ?? ''}
                alt={item.title}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h4 className="truncate text-sm font-medium text-neutral-700 transition-colors group-hover:text-neutral-900">
                {item.title}
              </h4>
              <p className="text-xs font-bold text-neutral-900">
                {formatCurrency(item.current_price)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
