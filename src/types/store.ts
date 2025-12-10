import type { CartItemDTO } from '@/types/api';

export interface LocalCartItem extends Omit<CartItemDTO, 'id' | 'stock'> {
  id: string; 
  stock?: number; 
}

export interface CartState {
  items: LocalCartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export interface CartActions {
  addItem: (item: LocalCartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export type CartSlice = CartState & CartActions;