'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { fetchWishlist, updateWishlist } from '@/utils/supabase/client/wishlist';
import { useStore } from '@/store';

import { useAuth } from './useAuth';

interface UseWishlistReturn {

  /** Current wishlist items (product/variant IDs) */
  wishlist: string[];

  /** Add item to wishlist (instant UI + background sync) */
  addToWishlist: (item: string) => void;

  /** Remove item from wishlist (instant UI + background sync) */
  removeFromWishlist: (item: string) => void;

  /** Loading state for auth or wishlist data */
  isLoading: boolean;

  /** Whether user is authenticated */
  isAuthenticated: boolean;
}

/**
 * Custom hook for managing the user's wishlist.
 *
 * @remarks
 * Client-side only hook. Combines local Zustand state for instant UI updates
 * with background synchronization to Supabase for authenticated users.
 * Automatically loads server wishlist on login when local state is empty.
 */
export function useWishlist(): UseWishlistReturn {
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

  // Sync server wishlist → local store when loaded
  useEffect(() => {
    if (data !== undefined) {
      setWishlist(data);
    }
  }, [data, setWishlist]);

  // Background sync mutation
  const { mutate: syncWishlist } = useMutation({
    mutationFn: (items: string[]) => updateWishlist(userId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', userId] });
    },
  });

  const addToWishlist = (item: string) => {
    const newList = [...wishlist, item];
    addLocal(item);
    if (userId) syncWishlist(newList);
  };

  const removeFromWishlist = (item: string) => {
    const newList = wishlist.filter((i) => i !== item);
    removeLocal(item);
    if (userId) syncWishlist(newList);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isLoading: queryLoading || authLoading,
    isAuthenticated: !!user,
  };
}

export default useWishlist;
