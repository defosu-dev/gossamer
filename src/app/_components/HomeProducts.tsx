'use client';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import type { CategoryDTO, ProductCardDTO } from '@/types/api';
import CategoryBar from '@/components/modules/CategoryBar/CategoryBar';
import { useState } from 'react';

interface HomeProductsProps {
  categories: CategoryDTO[];
  products: ProductCardDTO[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function HomeProducts({ categories, products }: HomeProductsProps) {
  const [productsArray, setProductsArray] = useState(products);
  const [categoriesArray, setCategoriesArray] = useState(categories);

  const handleCategories = (item: CategoryDTO | null) => {
    if (item === null) {
      console.log('All');
      return;
    }
    console.log(item);
  };

  return (
    <>
      <CategoryBar categories={categoriesArray} onSelect={(item) => handleCategories(item)} />

      {/* Product Grid */}
      <section className="container mx-auto max-w-7xl p-1 px-6">
        <ProductGrid productList={productsArray} />
      </section>
    </>
  );
}

export default HomeProducts;
