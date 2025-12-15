import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import SearchBar from '@/components/modules/SearchBar/SearchBar';
import ExploreSection from './_components/ExploreCurated/ExploreSection';
import NewArrival from './_components/NewArrival/NewArrival';
import { testdatanewarrival } from './_components/NewArrival/testdatanewarrival';
import { cn } from '@/lib/utils/cn';
import dynamic from 'next/dynamic';

const HomeProducts = dynamic(() => import('./_components/HomeProducts'), {
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const products = await fetch(`${baseUrl}/api/products?page=1&limit=12`, {
    cache: 'no-store',
  }).then((res) => res.json());

  const categories = await fetch(`${baseUrl}/api/products/categories?featured=true`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <div className="flex w-full flex-col gap-10 pb-16">
      <SearchBar className={cn('mt-5')} />

      <HomeProducts products={products.data} categories={categories} meta={products.meta} />

      {/* New Arrival Section */}
      <NewArrival {...testdatanewarrival} />

      {/* Explore Section */}
      <ExploreSection />
    </div>
  );
}

export default HomePage;
