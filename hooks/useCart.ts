import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCart, updateCart } from '@/utils/supabase/client/cart';
import { useAuth } from './useAuth';
import { useStore } from '@/store';
import { useEffect } from 'react';

/**
 * Custom hook for managing the user's shopping cart.
 * 
 * - Returns data from Zustand store (prevents UI flickering).
 * - Synchronizes cart with Supabase via React Query.
 * - Automatically loads cart on user authentication.
 * - Local mutations (add/remove) are instant in UI.
 * - Changes are persisted to Supabase in the background.
 * 
 * @returns {Object} Cart state and actions
 * @returns {string[]} .cart - Current cart items (from Zustand)
 * @returns {(item: string) => void} .addToCart - Add item to cart
 * @returns {(item: string) => void} .removeFromCart - Remove item from cart
 * @returns {boolean} .isLoading - True if auth or data is loading
 * @returns {boolean} .isAuthenticated - True if user is logged in
 */

export const useCart = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const { cart, setCart, addToCart: addLocal, removeFromCart: removeLocal } = useStore();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => fetchCart(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data !== undefined) {
      setCart(data);
    }
  }, [data, setCart]);

  const { mutate: syncCart } = useMutation({
    mutationFn: (items: string[]) => updateCart(userId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  const addToCart = (item: string) => {
    const newCart = [...cart, item];
    addLocal(item);
    syncCart(newCart);
  };

  const removeFromCart = (item: string) => {
    const newCart = cart.filter((i) => i !== item);
    removeLocal(item);
    syncCart(newCart);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isLoading: queryLoading || authLoading,
    isAuthenticated: !!user,
  };
};