'use client';

import type { ProductWithRelations } from '@/types/IProductsWithRelations';

import { supabaseBrowser } from '../supabaseBrowser';

interface FetchProductsParams {
  /** Page number (1-based). Default: 1 */
  page?: number;

  /** Items per page. Default: 20 */
  limit?: number;

  /** Simple equality filters (e.g. { category_id: 3 }) */
  filters?: Record<string, string | number | boolean>;

  /** Sorting options. Only safe top-level fields are sorted server-side */
  sort?: { field: string; order: 'asc' | 'desc' };
}

/**
 * Client-side utility: fetches paginated products with full relations.
 *
 * @remarks
 * - Uses `supabaseBrowser` → must be called only in client components
 * - Server-side filtering & pagination for performance
 * - Safe sorting on top-level fields (id, title, created_at, description)
 * - Price sorting (min price across variants) is performed client-side
 * - Returns exact count for pagination UI
 */
export const fetchProducts = async ({
  page = 1,
  limit = 20,
  filters = {},
  sort = { field: 'created_at', order: 'desc' },
}: FetchProductsParams = {}) => {
  const supabase = supabaseBrowser;

  let query = supabase.from('products').select(
    `
      id,
      title,
      description,
      created_at,
      category:category_id ( name, slug ),
      product_variants (
        id, name, sku, current_price, old_price, stock,
        product_images ( id, url, alt, position )
      )
    `,
    { count: 'exact' }
  );

  // Apply filters
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  // Server-side safe sorting
  type ServerSortableField = 'id' | 'title' | 'created_at' | 'description';
  const serverSortable: ServerSortableField[] = ['id', 'title', 'created_at', 'description'];

  if (serverSortable.includes(sort.field as ServerSortableField)) {
    query = query.order(sort.field, { ascending: sort.order === 'asc' });
  }

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  let finalData = data as ProductWithRelations[] | null;

  // Client-side sort by minimum price across variants
  if (finalData && sort.field === 'price') {
    const getMinPrice = (variants: ProductWithRelations['product_variants']) => {
      const prices = variants.map((v) => v.current_price).filter((p): p is number => p !== null);
      return prices.length ? Math.min(...prices) : Infinity;
    };

    finalData = [...finalData].sort((a, b) => {
      const pa = getMinPrice(a.product_variants);
      const pb = getMinPrice(b.product_variants);
      return sort.order === 'asc' ? pa - pb : pb - pa;
    });
  }

  return { data: finalData ?? [], count: count ?? 0 };
};
