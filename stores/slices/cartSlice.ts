import { StateCreator } from 'zustand'

export type CartSlice = {
    cart: string[]
    addToCart: (item: string) => void
    removeFromCart: (item: string) => void
}
  
export const createCartSlice: StateCreator<CartSlice> = (set, get, api) => ({
  cart: [],
  addToCart: (item) => set({ cart: [...get().cart, item] }),
  removeFromCart: (item) => set({ cart: get().cart.filter((i) => i !== item) }),
})