'use client';

import { useState } from 'react';
import { Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import formatCurrency from '@/lib/utils/formatCurrency';
import type { ProductDetailDTO, ProductVariantDTO } from '@/types/api';
import { useCheckInWishlist, useToggleWishlist } from '@/hooks/useWishlist';

interface InfoBlockProps {
  product: ProductDetailDTO;
  selectedVariant: ProductVariantDTO;
  onVariantChange: (variant: ProductVariantDTO) => void;
}

type Tab = 'description' | 'specs';

export function InfoBlock({ product, selectedVariant, onVariantChange }: InfoBlockProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [isExpanded, setIsExpanded] = useState(false);

  const isFavorite = useCheckInWishlist(selectedVariant.id);
  const { mutate: toggleWishlist } = useToggleWishlist();

  const fallbackImage = product.variants?.[0]?.images?.[0]?.url ?? '';

  const descriptionText = product.description ?? 'No description available for this product.';
  const isLongDescription = descriptionText.length > 200;

  return (
    <div className="w-full rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900">{product.title}</h1>

      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
        {product.category && (
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
            {product.category.name}
          </span>
        )}

        <div className="flex items-center">
          <Star className="mr-1 size-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-neutral-900">{product.rating}</span>
          <span className="ml-1">({product.reviewsCount} reviews)</span>
        </div>

        <button
          onClick={() => toggleWishlist(selectedVariant.id)}
          className={cn(
            'ml-auto flex cursor-pointer items-center gap-1 font-medium transition-colors hover:text-red-500',
            isFavorite ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          <Heart className={cn('size-4', isFavorite && 'fill-current')} />
          <span>{isFavorite ? 'Saved' : 'Add to wishlist'}</span>
        </button>
      </div>

      <div className="mb-6 border-b border-neutral-100 pb-6">
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-neutral-900">
            {formatCurrency(selectedVariant.price ?? 0)}
          </p>
          {selectedVariant.oldPrice && (
            <p className="text-lg text-neutral-400 line-through">
              {formatCurrency(selectedVariant.oldPrice)}
            </p>
          )}
        </div>
        {selectedVariant.sku && (
          <p className="mt-1 text-xs text-neutral-400">SKU: {selectedVariant.sku}</p>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-neutral-900">Choose Option</h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              const image = variant.images[0]?.url ?? fallbackImage;

              return (
                <button
                  key={variant.id}
                  onClick={() => onVariantChange(variant)}
                  className={cn(
                    'relative h-16 w-16 rounded-lg transition-all [&>*]:rounded-lg',
                    isSelected && 'shadow-sm'
                  )}
                  title={variant.name ?? 'Variant'}
                >
                  <ImageWithFallback
                    src={image ?? ''}
                    alt={variant.name ?? ''}
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              );
            })}
          </div>
          {selectedVariant.name && (
            <p className="mt-2 text-sm text-neutral-600">
              Selected: <span className="font-medium text-neutral-900">{selectedVariant.name}</span>
            </p>
          )}
        </div>
      )}

      <div className="mb-6 flex border-b border-gray-200 text-sm font-medium">
        <button
          onClick={() => setActiveTab('description')}
          className={cn(
            'border-b-2 px-4 py-3 transition-colors',
            activeTab === 'description'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-black'
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={cn(
            'border-b-2 px-4 py-3 transition-colors',
            activeTab === 'specs'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-black'
          )}
        >
          Specifications
        </button>
      </div>

      <div className="min-h-20 space-y-4 text-sm leading-relaxed text-gray-700">
        {activeTab === 'description' && (
          <div className="animate-in fade-in duration-300">
            <p
              className={cn(
                'whitespace-pre-line transition-all duration-200',
                !isExpanded && isLongDescription && 'line-clamp-3 overflow-hidden'
              )}
            >
              {descriptionText}
            </p>

            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:underline focus:outline-none"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="size-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="size-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="animate-in fade-in duration-300">
            {selectedVariant.attributes.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm text-gray-500">
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {selectedVariant.attributes.map((attr) => (
                      // 👇 ЗМІНА: Прибрано hover:bg-gray-50
                      <tr key={attr.slug}>
                        <th className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          {attr.name}
                        </th>
                        <td className="px-4 py-3 text-gray-700">{attr.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No specifications available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoBlock;
