import { default as dynamicImport } from 'next/dynamic';

import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import SearchBar from '@/components/modules/SearchBar/SearchBar';
import type { ProductListResponse } from '@/types/api';

import ExploreSection from './_components/ExploreCurated/ExploreSection';
import NewArrival from './_components/NewArrival/NewArrival';
import { testdatanewarrival } from './_components/NewArrival/testdatanewarrival';

export const revalidate = 300;
export const dynamic = 'force-static';

const HomeProducts = dynamicImport(() => import('./_components/HomeProducts'), {
  loading: () => <ProductGridLoading />,
});

/**
 * Home page with:
 * - Search bar
 * - Product grid (first 6 cards with priority for LCP)
 * - New Arrival section (static test data)
 * - Explore curated section.
 *
 * @remarks
 * This is a server component. Products are fetched server-side using `fetchProducts`.
 * Streaming is enabled via Suspense boundary around the product grid.
 */
async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  let initialData: ProductListResponse | null = null;
  let categories = null;

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

  try {
    const res = await fetch(`${baseUrl}/api/products/categories?featured=true`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch initial catalog data:', error);
  }

  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-16">
      <SearchBar />

      <HomeProducts products={safeData} categories={categories} />

      <NewArrival {...testdatanewarrival} />

      <ExploreSection />
    </div>
  );
}

export default HomePage;
