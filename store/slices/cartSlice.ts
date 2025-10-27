import { StateCreator } from 'zustand';

export type CartSlice = {
  cart: string[];
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
  clearCart: () => void;
  setCart: (items: string[]) => void;
};

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (item) => set((state) => ({ cart: state.cart.filter((i) => i !== item) })),
  clearCart: () => set({ cart: [] }),
  setCart: (items) => set({ cart: items }),
});