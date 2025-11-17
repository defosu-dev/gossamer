// hooks/useWishlist.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWishlist, updateWishlist } from '@/utils/supabase/client/wishlist';
import { useAuth } from './useAuth';
import { useStore } from '@/store';
import { useEffect } from 'react';

/**
 * Custom hook for managing the user's wishlist.
 *
 * - Returns data from Zustand store (prevents UI flickering).
 * - Synchronizes wishlist with Supabase via React Query.
 * - Automatically loads wishlist on user authentication.
 * - Local mutations (add/remove) are instant in UI.
 * - Changes are persisted to Supabase in the background.
 *
 * @returns {Object} Wishlist state and actions
 * @returns {string[]} .wishlist - Current wishlist items (from Zustand)
 * @returns {(item: string) => void} .addToWishlist - Add item to wishlist
 * @returns {(item: string) => void} .removeFromWishlist - Remove item from wishlist
 * @returns {boolean} .isLoading - True if auth or data is loading
 * @returns {boolean} .isAuthenticated - True if user is logged in
 */

export const useWishlist = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const {
    wishlist,
    setWishlist,
    addToWishlist: addLocal,
    removeFromWishlist: removeLocal,
  } = useStore();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => fetchWishlist(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data !== undefined) {
      setWishlist(data);
    }
  }, [data, setWishlist]);

  const { mutate: syncWishlist } = useMutation({
    mutationFn: (items: string[]) => updateWishlist(userId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', userId] });
    },
  });

  const addToWishlist = (item: string) => {
    const newList = [...wishlist, item];
    addLocal(item);
    syncWishlist(newList);
  };

  const removeFromWishlist = (item: string) => {
    const newList = wishlist.filter((i) => i !== item);
    removeLocal(item);
    syncWishlist(newList);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isLoading: queryLoading || authLoading,
    isAuthenticated: !!user,
  };
};
