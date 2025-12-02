import { fetchProducts } from '@/lib/utils/supabase/client/products';
import ProductCard from '../ProductCard/ProductCard';

interface ProductGridProps {
  productList?: Awaited<ReturnType<typeof fetchProducts>>['data'];
}

export async function ProductGrid({ productList = [] }: ProductGridProps) {
  if (productList.length === 0) {
    return <div>No products available.</div>;
  }
  return (
    <>
      {productList.slice(0, 6).map((product) => (
        <ProductCard key={product.id} product={product} priority={true} />
      ))}
      {productList.slice(6).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
