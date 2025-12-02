import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import SearchBar from '@/components/modules/SearchBar/SearchBar';
import { Suspense } from 'react';
import ExploreSection from './_components/ExploreCurated/ExploreSection';
import NewArrival from './_components/NewArrival/NewArrival';
import { testdatanewarrival } from './_components/NewArrival/testdatanewarrival';
import HomeProductGrid from './_components/HomeProductGrid';
import CategoryBar from '../components/modules/CategoryBar/CategoryBar';
import { cn } from '@/lib/utils/cn';

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
  return (
    <div className="flex w-full flex-col gap-10 pb-16">
      <SearchBar className={cn('mt-5')} />
      <CategoryBar />

      {/* Product Grid */}
      <section className="container mx-auto max-w-7xl p-1 px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense fallback={<ProductGridLoading />}>
            <HomeProductGrid />
          </Suspense>
        </div>
      </section>

      {/* New Arrival Section */}
      <NewArrival {...testdatanewarrival} />

      {/* Explore Section */}
      <ExploreSection />
    </div>
  );
}

export default HomePage;
