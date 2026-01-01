import dynamic from 'next/dynamic';

import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import { SearchBar } from '@/components/modules/SearchBar/SearchBar';
import type { ProductListResponse } from '@/types/api';

const CatalogProducts = dynamic(() => import('./_components/CatalogProducts'), {
  loading: () => <ProductGridLoading />,
});

/**
 * Catalog Page.
 *
 * Renders the main product catalog with search and pagination.
 * Uses ISR (Incremental Static Regeneration) strategy with a 5-minute cache.
 *
 * @returns The rendered catalog page.
 */
async function CatalogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  let initialData: ProductListResponse | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/products?page=1&limit=12`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      initialData = await res.json();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch initial catalog data:', error);
  }

  const safeData: ProductListResponse = initialData ?? {
    data: [],
    meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
  };

  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-16">
      <SearchBar />
      <CatalogProducts initialData={safeData} />
    </div>
  );
}

export default CatalogPage;
