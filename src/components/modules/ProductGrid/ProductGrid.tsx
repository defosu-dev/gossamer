import type { ProductCardDTO } from '@/types/api';
import ProductCard from '@/components/modules/ProductCard/ProductCard';
import ProductGridEmpty from './ProductGridEmpty';

interface ProductGridProps {
  productList?: ProductCardDTO[];
}

export function ProductGrid({ productList = [] }: ProductGridProps) {
  if (!productList || productList.length === 0) {
    return <ProductGridEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productList.slice(0, 6).map((product) => (
        <ProductCard key={product.id} product={product} priority={true} />
      ))}

      {productList.slice(6).map((product) => (
        <ProductCard key={product.id} product={product} priority={false} />
      ))}
    </div>
  );
}
