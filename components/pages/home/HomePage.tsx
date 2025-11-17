'use server';
import React, { Suspense } from 'react';
import NewArrival from './sections/newarrival/NewArrival';
import ProductCard from '@/components/common/blocks/ProductCard/ProductCard';
import ExploreSection from './sections/explorecurated/ExploreSection';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { testdatanewarrival } from './sections/newarrival/testdatanewarrival';
import { fetchProducts } from '@/utils/supabase/server/products';

/**
 * Home page with:
 * - Search bar
 * - Product grid (first 6 cards with priority for LCP)
 * - New Arrival section (static test data)
 * - Explore curated section
 *
 * Products are fetched via `useProducts` hook with price ascending sort.
 */
export default async function HomePage() {
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

const ProductGridServer = async () => {
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
};

const ProductGridLoading = () => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <ProductCard key={i} isLoading />
      ))}
    </>
  );
};
