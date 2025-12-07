import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';
import ProductGridEmpty from '@/components/modules/ProductGrid/ProductGridEmpty';
import toast from 'react-hot-toast';

export default async function HomeProductGrid() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/products?page=1&limit=8`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    toast.error('Failed to load products');
    return <ProductGridEmpty />;
  }
  const { data } = await res.json();
  return <ProductGrid productList={data} />;
}
