import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CartSlice, createCartSlice } from './slices/cartSlice'
import { WishlistSlice, createWishlistSlice } from './slices/wishlistSlice'

export type Store = CartSlice & WishlistSlice

export const useStore = create<Store>()(
  devtools((set, get, api) => ({
    ...createCartSlice(set, get, api),
    ...createWishlistSlice(set, get, api),
  }))
)
