import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartSlice, createCartSlice } from './slices/cartSlice';
import { WishlistSlice, createWishlistSlice } from './slices/wishlistSlice';

export type Store = CartSlice & WishlistSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createCartSlice(set, get, api),
        ...createWishlistSlice(set, get, api),
      }),
      {
        name: 'gossamer-main-store',
        partialize: (state) => ({
          cart: state.cart,
          wishlist: state.wishlist,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            console.error('Failed to rehydrate Zustand store:', error);
          }
        },
      }
    )
  )
);
