import { StateCreator } from 'zustand';

export type CartItem = {
  variant_id: string;
  quantity: number;
};

export type CartSlice = {
  cart: CartItem[];
  addToCart: (variantId: string, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
};

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
  addToCart: (variantId, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.variant_id === variantId);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.variant_id === variantId ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return { cart: [...state.cart, { variant_id: variantId, quantity }] };
    }),
  removeFromCart: (variantId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.variant_id !== variantId),
    })),
  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.variant_id === variantId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  setCart: (items) => set({ cart: items }),
});
