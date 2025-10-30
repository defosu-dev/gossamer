import type { ProductWithRelations } from "@/types/IProductsWithRelations";

/**
 * Returns the primary image from all product variants.
 * - Sorted by `position` (ascending).
 * - Skips images without `url`.
 * - Guarantees `url` and `alt` are strings (empty if missing).
 */
export const getPrimaryImage = (
  variants: ProductWithRelations["product_variants"]
): { url: string; alt: string } | null => {
  const allImages = variants
    .flatMap((v) => v.product_images ?? [])
    .filter((img): img is NonNullable<typeof img> => img.url != null);

  if (allImages.length === 0) return null;

  const primary = allImages.sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  )[0];

  return {
    url: primary.url ?? "",
    alt: primary.alt ?? "",
  };
};
