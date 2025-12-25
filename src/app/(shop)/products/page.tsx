import dynamic from 'next/dynamic';
import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import { SearchBar } from '@/components/modules/SearchBar/SearchBar';
import type { ProductListResponse } from '@/types/api';

const CatalogProducts = dynamic(() => import('./_components/CatalogProducts'), {
  loading: () => <ProductGridLoading />,
});
async function CatalogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  let initialData: ProductListResponse | null = null;

  const res = await fetch(`${baseUrl}/api/products?page=1&limit=12`, {
    cache: 'no-store',
  });

  if (res.ok) {
    initialData = await res.json();
  }

  const safeData: ProductListResponse = initialData || {
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
