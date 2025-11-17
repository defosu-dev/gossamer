import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/utils/supabase/client/products';

/**
 * Hook to fetch paginated, filtered, and sorted products.
 *
 * @param page   - Current page (1-based). Default: 1.
 * @param limit  - Items per page. Default: 20.
 * @param filters - Key-value object for Supabase filters (e.g., { category_id: 3 }).
 * @param sort   - Sort field and order. Default: { field: "created_at", order: "desc" }.
 *
 * @returns React Query result with `data`, `count`, `isLoading`, etc.
 */
export const useProducts = ({
  page = 1,
  limit = 20,
  filters = {},
  sort = { field: 'created_at', order: 'desc' },
}: {
  page?: number;
  limit?: number;
  filters?: Record<string, string | number | boolean>;
  sort?: { field: string; order: 'asc' | 'desc' };
} = {}) =>
  useQuery({
    queryKey: ['products', { page, limit, filters, sort }],
    queryFn: () => fetchProducts({ page, limit, filters, sort }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
