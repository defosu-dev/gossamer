'use client';

import { useState } from 'react';
import type { ProductDetailDTO, ProductVariantDTO } from '@/types/api';

import ProductGallery from './ProductGallery';
import InfoBlock from './ProductInfoBlock'; // Переконайтеся, що імпорт правильний (InfoBlock.tsx)
import ProductOrderBar from './ProductOrderBar';

interface ProductDetailsWrapperProps {
  product: ProductDetailDTO;
}

export function ProductDetailsWrapper({ product }: ProductDetailsWrapperProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantDTO>(product.variants[0]);

  return (
    <div className="mt-5 flex w-full flex-col items-start gap-8 p-1 px-4 lg:flex-row lg:px-6">
      <div className="w-fit lg:min-w-[400px]">
        <ProductGallery images={selectedVariant.images} category={product.category?.name} />
      </div>

      <div className="w-full min-w-0 flex-1">
        <InfoBlock
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      </div>

      <div className="w-full flex-shrink-0 lg:w-[320px]">
        <div className="sticky top-24">
          <ProductOrderBar product={product} selectedVariant={selectedVariant} />
        </div>
      </div>
    </div>
  );
}
