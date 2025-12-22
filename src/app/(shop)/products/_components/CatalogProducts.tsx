'use client';
import { Pagination } from '@/components/modules/product-filters/Pagination';
import { ProductFilterBar } from '@/components/modules/product-filters/ProductFilterBar';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import Container from '@/components/ui/Container';
import { useProducts } from '@/hooks/useProducts';
import type { ProductListResponse } from '@/types/api';
import { useState } from 'react';

interface CatalogProductsProps {
  products: ProductListResponse;
}

function CatalogProducts({ products: initialProducts }: CatalogProductsProps) {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useProducts(
    {
      page: 1,
      limit: 12,
    },
    {
      initialData: initialProducts,
    }
  );

  const productList = data?.data ?? [];

  return (
    <Container xCenter className="flex h-full w-full flex-col">
      <div className="grid h-full w-full grid-cols-4 gap-4">
        <div className="col-span-1">
          <ProductFilterBar />
        </div>
        <div className="col-span-3 flex w-full flex-col justify-center gap-6">
          <div
            className={
              isFetching ? 'opacity-50 transition-opacity' : 'opacity-100 transition-opacity'
            }
          >
            <ProductGrid productList={productList} className="xl:grid-cols-3" />
          </div>
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
        </div>
      </div>
    </Container>
  );
}

export default CatalogProducts;
