import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import { SearchBar } from '@/components/modules/SearchBar/SearchBar';
import Container from '@/components/ui/Container';
import dynamic from 'next/dynamic';

const CatalogProducts = dynamic(() => import('./_components/CatalogProducts'), {
  loading: () => <ProductGridLoading />,
});
/**
 * Catalog page placeholder.
 *
 * @remarks
 */
async function CatalogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/products?page=1&limit=12`, {
    cache: 'no-store',
  });

  const { data } = await res.json();

  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-16">
      <SearchBar />

      <CatalogProducts products={data} />
    </div>
  );
}

export default CatalogPage;
