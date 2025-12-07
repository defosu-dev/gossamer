import ProductCard from '../ProductCard/ProductCard';

export function ProductGridLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <ProductCard key={i} isLoading />
      ))}
    </div>
  );
}
