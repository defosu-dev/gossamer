import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import type { CartSlice } from '@/types/store';

export type Store = CartSlice; 

export const useStore = create<Store>()(
  devtools(
    persist(
      (...a) => ({
        ...createCartSlice(...a),
      }),
      {
        name: 'gossamer-main-store',
        partialize: (state) => ({
          items: state.items,
          totalPrice: state.totalPrice,
          totalQuantity: state.totalQuantity
        }),
      }
    ),
    { name: 'GossamerStore' }
  )
);