import type { StateCreator } from 'zustand';

/**
 *
 */
export interface WishlistSlice {
  /** Array of product/variant IDs in the wishlist */
  wishlist: string[];

  /** Add item to wishlist (no duplicates) */
  addToWishlist: (item: string) => void;

  /** Remove item from wishlist */
  removeFromWishlist: (item: string) => void;

  /** Replace entire wishlist (used for server sync) */
  setWishlist: (items: string[]) => void;
}

/**
 * Zustand slice for wishlist management.
 *
 * @remarks
 * Pure client-side slice used with Zustand + persist middleware.
 * Provides instant UI updates and works for both guest and authenticated users.
 * Designed to be synchronized with Supabase via useWishlist hook.
 */
export const createWishlistSlice: StateCreator<WishlistSlice> = (set) => ({
  wishlist: [],
  addToWishlist: (item) =>
    set((state) => ({
      wishlist: state.wishlist.includes(item) ? state.wishlist : [...state.wishlist, item],
    })),
  removeFromWishlist: (item) =>
    set((state) => ({
      wishlist: state.wishlist.filter((i) => i !== item),
    })),
  setWishlist: (items) => set({ wishlist: items }),
});

export default createWishlistSlice;
