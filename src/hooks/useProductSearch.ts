import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/services/api/products';
import { queryKeys } from '@/config/queryKeys';

export const useProductSearch = (q: string, category?: string) => {
  return useQuery({
    queryKey: queryKeys.products.search({ q, category }),
    queryFn: () => searchProducts(q, category),
    enabled: !!q,
  });
};
