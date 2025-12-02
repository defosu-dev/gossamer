import { getHomeProducts } from '@/lib/fetchers/server/getHomeProducts.server';
import { ProductGrid } from '@/components/modules/ProductGrid/ProductGrid';

export default async function HomeProductGrid() {
  const data = await getHomeProducts({ limit: 16 });
  return <ProductGrid productList={data} />;
}
