'use client';

import { useProducts } from '@/hooks/useProducts';
import type { ProductListResponse } from '@/types/api';
import { useState } from 'react';

import { Pagination } from '@/components/modules/product-filters/Pagination';
import { ProductFilterBar } from '@/components/modules/product-filters/ProductFilterBar';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import Container from '@/components/ui/Container';

interface CatalogProductsProps {
  initialData: ProductListResponse;
}

function CatalogProducts({ initialData }: CatalogProductsProps) {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useProducts(
    {
      page: page,
      limit: initialData?.meta.limit || 12,
    },
    {
      initialData: page === 1 ? initialData : undefined,
    }
  );

  const productList = data?.data ?? [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container xCenter className="flex h-full w-full flex-col">
      <div className="grid h-full w-full gap-4 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <div className="hidden lg:col-span-1 lg:block">
          <ProductFilterBar />
        </div>

        {/* Main Content */}
        <div className="col-span-4 flex w-full flex-col justify-between gap-8 lg:col-span-3">
          <div
            className={`min-h-[400px] transition-opacity duration-300 ${
              isFetching ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <ProductGrid productList={productList} className="xl:grid-cols-3" />
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-auto py-4">
              <Pagination
                currentPage={page}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default CatalogProducts;
