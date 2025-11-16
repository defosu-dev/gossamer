export type ProductWithRelations = {
  id: string;
  title: string;
  description: string | null;
  created_at: string | null;
  category: { name: string; slug: string } | null;
  product_variants: {
    id: string;
    name: string | null;
    sku: string | null;
    current_price: number | null;
    old_price: number | null;
    stock: number | null;
    product_images: {
      id: string;
      url: string | null;
      alt: string | null;
      position: number | null;
    }[];
  }[];
};
