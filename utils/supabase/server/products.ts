"use server";
import type { ProductWithRelations } from "@/types/IProductsWithRelations";
import { supabaseServer } from "../supabaseServer";

type FetchProductsParams = {
  page?: number;
  limit?: number;
  filters?: Record<string, string | number | boolean>;
  sort?: { field: string; order: "asc" | "desc" };
};

/**
 * Fetches paginated products with full relations.
 * - Server-side: filtering, pagination, safe sorting.
 */
export const fetchProducts = async ({
  page = 1,
  limit = 20,
  filters = {},
  sort = { field: "created_at", order: "desc" },
}: FetchProductsParams) => {
  const supabase = await supabaseServer();

  // 1. Base query with relations + count
  let query = supabase.from("products").select(
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
    { count: "exact" }
  );

  // 2. Apply filters (e.g. category_id, stock)
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  // 3. Server-side sort — only safe top-level fields
  type ServerSortableField = "id" | "title" | "created_at" | "description";
  const serverSortable: ServerSortableField[] = [
    "id",
    "title",
    "created_at",
    "description",
  ];

  if (serverSortable.includes(sort.field as ServerSortableField)) {
    query = query.order(sort.field, { ascending: sort.order === "asc" });
  }

  // 4. Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  // 5. Execute
  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  let finalData = data as ProductWithRelations[] | null;

  // 6. Client-side sort by min price (if requested)
  if (finalData && sort.field === "price") {
    const getMinPrice = (
      variants: ProductWithRelations["product_variants"]
    ) => {
      const prices = variants
        .map((v) => v.current_price)
        .filter((p): p is number => p !== null);
      return prices.length ? Math.min(...prices) : Infinity;
    };

    finalData = [...finalData].sort((a, b) => {
      const pa = getMinPrice(a.product_variants);
      const pb = getMinPrice(b.product_variants);
      return sort.order === "asc" ? pa - pb : pb - pa;
    });
  }

  return { data: finalData ?? [], count };
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

export async function getProductsByVariants(
  variantIds: string[]
): Promise<ProductWithVariant[]> {
  if (!variantIds?.length) return [];

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("product_variants")
    .select(
      `
      id,
      name,
      current_price,
      stock,
      product:
        product_id (
          id,
          title,
          description,
          created_at,
          category:
            category_id (
              name,
              slug
            ),
            product_variants (
              id,
              name,
              sku,
              current_price,
              old_price,
              stock,
              product_images (
                id,
                url,
                alt,
                position
              )
            )
        ),
        product_images (
          id,
          url,
          alt
        )
    `
    )
    .in("id", variantIds);

  if (error) throw error;

  // Перетворюємо варіанти у формат продукт + variant
  const products: ProductWithVariant[] = (data || [])
    .filter((v) => v.product)
    .map((v) => ({
      ...(v.product as ProductWithRelations),
      variant: {
        id: v.id,
        name: v.name,
        price: v.current_price,
        stock: v.stock,
        images:
          v.product_images?.map((img) => ({
            id: img.id,
            url: img.url,
            alt: img.alt || null,
          })) || [],
      },
    }));

  return products;
}

export async function getCartEnrichedProducts(variantIds: string[]) {
  if (!variantIds?.length) return [];
  const orFilter = variantIds.map((id) => `id.eq.${id}`).join(",");
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("product_variants")
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
        category:category_id (name, slug),
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
  console.log("Supabase fetch cart products:", data);
  if (error) throw error;

  return data;
}
