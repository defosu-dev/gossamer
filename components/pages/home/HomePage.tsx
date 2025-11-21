import { Suspense } from 'react';

import ProductCard from '@/components/common/blocks/ProductCard/ProductCard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { fetchProducts } from '@/utils/supabase/server/products';

import NewArrival from './sections/newarrival/NewArrival';
import ExploreSection from './sections/explorecurated/ExploreSection';
import { testdatanewarrival } from './sections/newarrival/testdatanewarrival';

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
export async function HomePage() {
  return (
    <div className="flex w-full flex-col gap-10 pb-16">
      <SearchBar />

      {/* Product Grid */}
      <section className="container mx-auto max-w-7xl p-1 px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense fallback={<ProductGridLoading />}>
            <ProductGridServer />
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

async function ProductGridServer() {
  const { data: products } = await fetchProducts({
    sort: { field: 'current_price', order: 'asc' },
  });

  return (
    <>
      {products?.slice(0, 6).map((product) => (
        <ProductCard key={product.id} product={product} priority={true} />
      ))}
      {products?.slice(6).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

function ProductGridLoading() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <ProductCard key={i} isLoading />
      ))}
    </>
  );
}

export default HomePage;
