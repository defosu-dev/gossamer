import { StateCreator } from 'zustand'

export type WishlistSlice = {
    wishlist: string[]
    addToWishlist: (item: string) => void
    removeFromWishlist: (item: string) => void
}
  
export const createWishlistSlice: StateCreator<WishlistSlice> = (set, get, api) => ({
  wishlist: [],
  addToWishlist: (item) => set({ wishlist: [...get().wishlist, item] }),
  removeFromWishlist: (item) => set({ wishlist: get().wishlist.filter((i) => i !== item) }),
})
