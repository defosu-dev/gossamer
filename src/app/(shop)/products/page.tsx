import { ProductGridLoading } from '@/components/modules/ProductGrid/ProductGridLoading';
import dynamic from 'next/dynamic';

const CatalogProductGrid = dynamic(() => import('./_components/CatalogProductGrid').then(), {
  loading: () => <ProductGridLoading />,
});
/**
 * Catalog page placeholder.
 *
 * @remarks
 * Client-side route for /catalog.
 */
export default function CatalogPage() {
  return (
    <section className="container mx-auto max-w-7xl p-1 px-6">
      <CatalogProductGrid />
    </section>
  );
}
