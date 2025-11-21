import type { StateCreator } from 'zustand';

/**
 *
 */
export interface CartItem {

  /** Variant ID from the product_variants table */
  variant_id: string;

  /** Quantity of this variant in the cart */
  quantity: number;
}

/**
 *
 */
export interface CartSlice {

  /** Current cart items */
  cart: CartItem[];

  /** Add variant to cart (increments quantity if already exists) */
  addToCart: (variantId: string, quantity?: number) => void;

  /** Remove variant completely from cart */
  removeFromCart: (variantId: string) => void;

  /** Update variant quantity (does not remove if ≤ 0) */
  updateQuantity: (variantId: string, quantity: number) => void;

  /** Clear entire cart */
  clearCart: () => void;

  /** Replace cart contents (used for server sync) */
  setCart: (items: CartItem[]) => void;
}

/**
 * Zustand slice for cart management.
 *
 * @remarks
 * Pure client-side slice used with Zustand + persist middleware.
 * Provides optimistic, immediate UI updates.
 * Designed to work for both guest and authenticated users.
 */
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

export default createCartSlice;
