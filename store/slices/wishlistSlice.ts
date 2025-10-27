import { StateCreator } from 'zustand';

export type WishlistSlice = {
  wishlist: string[];
  addToWishlist: (item: string) => void;
  removeFromWishlist: (item: string) => void;
  setWishlist: (items: string[]) => void;
};

export const createWishlistSlice: StateCreator<WishlistSlice> = (set) => ({
  wishlist: [],
  addToWishlist: (item) => set((state) => ({ wishlist: [...state.wishlist, item] })),
  removeFromWishlist: (item) => set((state) => ({ wishlist: state.wishlist.filter((i) => i !== item) })),
  setWishlist: (items) => set({ wishlist: items }),
});