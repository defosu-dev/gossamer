import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import { fetchProducts } from '@/lib/utils/supabase/server/products';
import { Suspense } from 'react';

export default async function CatalogProductGrid() {
  const { data: products } = await fetchProducts({
    sort: { field: 'current_price', order: 'asc' },
  });
  return (
    <div>
      <h2>Product Grid</h2>
      <Suspense fallback={<ProductGridLoading />}>
        <ProductGrid productList={products} />
      </Suspense>
    </div>
  );
}
