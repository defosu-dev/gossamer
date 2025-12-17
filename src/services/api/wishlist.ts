import type { ProductCardDTO } from "@/types/api";

export const wishlistService = {
  getAll: async (): Promise<ProductCardDTO[]> => {
    const res = await fetch('/api/wishlist');
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
  },

  toggle: async (variantId: string) => {
    const res = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ variantId }),
    });
    if (!res.ok) throw new Error('Failed to update wishlist');
    return res.json();
  },
};