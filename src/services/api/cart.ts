import type { CartDTO } from '@/types/api';

export const cartService = {
  get: async (): Promise<CartDTO> => {
    const res = await fetch('/api/cart');
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  },

  add: async (variantId: string, quantity: number) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  update: async (itemId: string, quantity: number) => {
    const res = await fetch('/api/cart', {
      method: 'PATCH',
      body: JSON.stringify({ itemId, quantity }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  remove: async (itemId: string) => {
    const res = await fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({ itemId }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  sync: async (items: { variantId: string; quantity: number }[]) => {
    const res = await fetch('/api/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
