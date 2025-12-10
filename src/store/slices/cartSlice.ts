import { type StateCreator } from 'zustand';
import type { CartSlice, LocalCartItem } from '@/types/store';
import type { Store } from '@/store';

const calculateTotals = (items: LocalCartItem[]) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

export const createCartSlice: StateCreator<
  Store,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  CartSlice
> = (set, get) => ({
  items: [],
  totalPrice: 0,
  totalQuantity: 0,

  addItem: (newItem) => {
    set(
      (state: Store) => {
        const existingItemIndex = state.items.findIndex(
          (i: LocalCartItem) => i.variantId === newItem.variantId
        );

        let updatedItems;

        if (existingItemIndex > -1) {
          updatedItems = [...state.items];
          const item = updatedItems[existingItemIndex];
          updatedItems[existingItemIndex] = {
            ...item,
            quantity: item.quantity + newItem.quantity,
          };
        } else {
          updatedItems = [...state.items, newItem];
        }

        return {
          items: updatedItems,
          ...calculateTotals(updatedItems),
        };
      },
      false,
      'cart/addItem'
    );
  },

  removeItem: (variantId) => {
    set(
      (state: Store) => {
        const updatedItems = state.items.filter((i: LocalCartItem) => i.variantId !== variantId);
        return {
          items: updatedItems,
          ...calculateTotals(updatedItems),
        };
      },
      false,
      'cart/removeItem'
    );
  },

  updateQuantity: (variantId, quantity) => {
    set(
      (state: Store) => {
        if (quantity <= 0) return state;

        const updatedItems = state.items.map((item: LocalCartItem) =>
          item.variantId === variantId ? { ...item, quantity } : item
        );

        return {
          items: updatedItems,
          ...calculateTotals(updatedItems),
        };
      },
      false,
      'cart/updateQuantity'
    );
  },

  clearCart: () => {
    set({ items: [], totalPrice: 0, totalQuantity: 0 }, false, 'cart/clear');
  },
});
