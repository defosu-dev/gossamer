'use server';

import type { ProductWithRelations } from '@/types/IProductsWithRelations';

import { supabaseServer } from '../supabaseServer';

interface FetchProductsParams {
  /** Page number (1-based). Default: 1 */
  page?: number;

  /** Items per page. Default: 20 */
  limit?: number;

  /** Simple equality filters (e.g. { category_id: 3 }) */
  filters?: Record<string, string | number | boolean>;

  /** Sorting options. Only safe fields are applied server-side */
  sort?: { field: string; order: 'asc' | 'desc' };
}

/**
 * Server action: fetches paginated products with full relations.
 *
 * @remarks
 * - Server-side filtering & pagination for security & performance
 * - Only safe top-level fields are sortable on the server
 * - Sorting by price is handled client-side (min price across variants)
 * - Returns exact count for pagination UI
 */
export const fetchProducts = async ({
  page = 1,
  limit = 20,
  filters = {},
  sort = { field: 'created_at', order: 'desc' },
}: FetchProductsParams = {}) => {
  const supabase = await supabaseServer();

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
  if (finalData !== null && finalData !== undefined && sort.field === 'price') {
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

export type ProductWithVariant = ProductWithRelations & {
  variant: {
    id: string;
    name: string | null;
    price: number | null;
    stock: number | null;
    images: { id: string; url: string | null; alt: string | null }[];
  };
};

/**
 * Server action: fetches products by a list of variant IDs.
 *
 * @remarks
 * Used in cart/checkout flow to get full product data from variant IDs.
 */
export async function getProductsByVariants(variantIds: string[]): Promise<ProductWithVariant[]> {
  if (variantIds == null || variantIds.length === 0) return [];

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('product_variants')
    .select(
      `
      id,
      name,
      current_price,
      stock,
      product:product_id (
        id,
        title,
        description,
        created_at,
        category:category_id ( name, slug ),
        product_variants (
          id, name, sku, current_price, old_price, stock,
          product_images ( id, url, alt, position )
        )
      ),
      product_images ( id, url, alt )
    `
    )
    .in('id', variantIds);

  if (error) throw error;

  const products: ProductWithVariant[] = (data ?? [])
    .filter((v): v is NonNullable<typeof v> => v.product != null)
    .map((v) => ({
      ...(v.product as ProductWithRelations),
      variant: {
        id: v.id,
        name: v.name,
        price: v.current_price,
        stock: v.stock,
        images: v.product_images.map((img) => ({
          id: img.id,
          url: img.url,
          alt: img.alt ?? null,
        })),
      },
    }));

  return products;
}

/**
 * Server action: fetches enriched variant data for cart items.
 *
 * @remarks
 * Optimized query for cart rendering — returns variant + full product + all variants + images.
 * Used by useCart hook for client-side enrichment.
 */
export async function getCartEnrichedProducts(variantIds: string[]) {
  if (variantIds == null || variantIds.length === 0) return [];

  const orFilter = variantIds.map((id) => `id.eq.${id}`).join(',');
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('product_variants')
    .select(
      `
      id,
      name,
      sku,
      current_price,
      old_price,
      stock,
      product_id,
      product_images!variant_id (
        id,
        url,
        alt,
        position
      ),
      product:products (
        id,
        title,
        description,
        created_at,
        category:category_id ( name, slug ),
        product_variants!product_id (
          id,
          name,
          sku,
          current_price,
          old_price,
          stock
        )
      )
    `
    )
    .or(orFilter);

  if (error) throw error;

  return data ?? [];
}
