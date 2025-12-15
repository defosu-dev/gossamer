'use client';
import CategoryBar from '@/components/modules/CategoryBar/CategoryBar';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import type { CategoryDTO, ProductListResponse } from '@/types/api';
import { useState } from 'react';

interface HomeProductsProps {
  categories: CategoryDTO[];
  products: ProductListResponse;
}

function HomeProducts({ categories, products: initialProducts }: HomeProductsProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | undefined>(undefined);
  const { data, isFetching } = useProducts(
    {
      page: 1,
      limit: 12,
      category: activeCategorySlug,
    },
    {
      initialData: activeCategorySlug === undefined ? initialProducts : undefined,
    }
  );

  const handleCategorySelect = (category: CategoryDTO | null) => {
    setActiveCategorySlug(category?.slug);
  };

  const productList = data?.data ?? [];

  return (
    <>
      <CategoryBar categories={categories} onSelect={handleCategorySelect} />

      <section className="container mx-auto max-w-7xl p-1 px-6">
        <div
          className={
            isFetching ? 'opacity-50 transition-opacity' : 'opacity-100 transition-opacity'
          }
        >
          <ProductGrid productList={productList} />
        </div>
      </section>
    </>
  );
}

export default HomeProducts;
