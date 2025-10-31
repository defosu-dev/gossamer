"use client";
import React from "react";
import NewArrival from "./sections/newarrival/NewArrival";
import ProductCard from "@/components/common/blocks/ProductCard/ProductCard";
import ExploreSection from "./sections/explorecurated/ExploreSection";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import { testdatanewarrival } from "./sections/newarrival/testdatanewarrival";

/**
 * Home page with:
 * - Search bar
 * - Product grid (first 6 cards with priority for LCP)
 * - New Arrival section (static test data)
 * - Explore curated section
 *
 * Products are fetched via `useProducts` hook with price ascending sort.
 */
export default function HomePage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts({
    sort: { field: "price", order: "asc" },
  });

  // Debug logs (remove in prod)
  if (isLoading) console.log("Loading");
  if (isError) console.error("Error fetching products");

  return (
    <div className="flex flex-col w-full gap-10 pb-16">
      <SearchBar />

      {/* Product Grid */}
      <section className="container mx-auto p-1 max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading &&
            [...Array(8)].map((_, i) => <ProductCard key={i} isLoading />)}
          {products?.data.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} priority={true} />
          ))}
          {products?.data.slice(6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrival Section */}
      <NewArrival {...testdatanewarrival} />

      {/* Explore Section */}
      <ExploreSection />
    </div>
  );
}
