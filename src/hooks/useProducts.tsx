import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productsService } from '@/services/api/products';
import { queryKeys } from '@/config/queryKeys';
import type { ProductListParams, ProductListResponse } from '@/types/api';

interface UseProductsOptions {
  initialData?: ProductListResponse;
}

export const useProducts = (params: ProductListParams, options?: UseProductsOptions) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsService.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    initialData: options?.initialData,
  });
};
