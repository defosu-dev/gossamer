import ProductCard from '../ProductCard/ProductCard';

export function ProductGridLoading() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <ProductCard key={i} isLoading />
      ))}
    </>
  );
}
