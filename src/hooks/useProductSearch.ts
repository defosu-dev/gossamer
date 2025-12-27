import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryKeys';
import { productsService } from '@/services/api/products';

export const useProductSearch = (q: string, limit: number = 6, category?: string) => {
  return useQuery({
    queryKey: queryKeys.products.search({ q, category, page: limit }), 
    queryFn: () => productsService.search(q, category, limit),
    enabled: !!q && q.length > 2,
    staleTime: 1000 * 60, 
  });
};