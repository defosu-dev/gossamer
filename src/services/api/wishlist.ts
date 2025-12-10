import type { WishlistItemDTO } from '@/types/api';

// Тип відповіді від toggle-ендпоінту
export interface ToggleWishlistResponse {
  status: 'added' | 'removed';
  variantId: string;
}

export const wishlistService = {
  // Отримати весь список
  getAll: async (): Promise<WishlistItemDTO[]> => {
    const res = await fetch('/api/wishlist', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      // Можна додати обробку 401, якщо потрібно
      throw new Error('Failed to fetch wishlist');
    }

    return res.json();
  },

  // Додати/Видалити (Toggle)
  toggle: async (variantId: string): Promise<ToggleWishlistResponse> => {
    const res = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to update wishlist');
    }

    return res.json();
  },
};
