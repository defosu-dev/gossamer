import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import { createCartSlice, type CartSlice } from './slices/cartSlice';

export type Store = CartSlice;

/**
 * Global Zustand store combining cart and wishlist slices.
 *
 * @remarks
 * - Persisted in localStorage under `gossamer-main-store`
 * - Includes Redux DevTools integration in development
 * - Survives page reloads for guest users
 */
export const useStore = create<Store>()(
  devtools(
    persist(
      (...args) => {
        const [set, get, api] = args;

        return {
          ...createCartSlice(set, get, api),
        };
      },
      {
        name: 'gossamer-main-store',
        partialize: (state) => ({
          cart: state.cart,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error != null) {
            toast.error('Failed to rehydrate Zustand store:', error);
          }
        },
      }
    )
  )
);

export default useStore;
