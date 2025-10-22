import { create } from 'zustand';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createCartSlice, CartSlice } from './slices/cartSlice';

export const useStore = create<AuthSlice & CartSlice>()((set, get) => ({
    ...createAuthSlice(set, get),
    ...createCartSlice(set, get),
}));
