'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/utils/supabase/client/products';

interface UseProductsParams {
  /** Current page (1-based). Default: 1 */
  page?: number;

  /** Items per page. Default: 20 */
  limit?: number;

  /** Key-value filters for Supabase (e.g., { category_id: 3 }) */
  filters?: Record<string, string | number | boolean>;

  /** Sort field and order */
  sort?: { field: string; order: 'asc' | 'desc' };
}

/**
 * Hook to fetch paginated, filtered, and sorted products.
 *
 * @remarks
 * Client-side only hook. Uses React Query for caching and automatic refetching.
 * Keeps previous data while new page is loading (`placeholderData`).
 *
 * @param params Pagination, filtering and sorting options.
 * @returns React Query result with `data`, `isLoading`, `error`, etc.
 */
export function useProducts({
  page = 1,
  limit = 20,
  filters = {},
  sort = { field: 'created_at', order: 'desc' },
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ['products', { page, limit, filters, sort }],
    queryFn: () => fetchProducts({ page, limit, filters, sort }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}

export default useProducts;
