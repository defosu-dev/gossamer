import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/store';
import { cartService } from '@/services/api/cart';
import { toast } from 'react-hot-toast';
import type { LocalCartItem } from '@/types/store';
import { queryKeys } from '@/config/queryKeys';
import { useUser } from './user';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // --- ZUSTAND: Отримуємо дані (Це ок) ---
  const localItems = useStore((s) => s.items);
  const localTotal = useStore((s) => s.totalPrice);
  const localQty = useStore((s) => s.totalQuantity);

  // --- ZUSTAND: Отримуємо дії (ВИПРАВЛЕНО) ---
  const localAddItem = useStore((s) => s.addItem);
  const localRemoveItem = useStore((s) => s.removeItem);
  const localUpdateQuantity = useStore((s) => s.updateQuantity);
  const localClearCart = useStore((s) => s.clearCart);

  const cartQuery = useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: cartService.get,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const syncMutation = useMutation({
    mutationFn: cartService.sync,
    onSuccess: () => {
      localClearCart();
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success('Cart synchronized');
    },
    onError: () => {
      toast.error('Failed to sync cart');
    },
  });

  useEffect(() => {
    if (user && localItems.length > 0) {
      syncMutation.mutate(
        localItems.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
      );
    }
  }, [user, localItems.length]);

  const addItem = (item: LocalCartItem) => {
    if (user) {
      return cartService
        .add(item.variantId, item.quantity)
        .then(() => queryClient.invalidateQueries({ queryKey: queryKeys.cart.all }))
        .catch(() => toast.error('Error adding to cart'));
    } else {
      // Guest: Zustand
      localAddItem(item);
      toast.success('Added to cart');
    }
  };

  const removeItem = (variantId: string, itemId?: string) => {
    if (user && itemId) {
      cartService
        .remove(itemId)
        .then(() => queryClient.invalidateQueries({ queryKey: queryKeys.cart.all }));
    } else {
      localRemoveItem(variantId);
    }
  };

  const updateQuantity = (variantId: string, quantity: number, itemId?: string) => {
    if (user && itemId) {
      cartService
        .update(itemId, quantity)
        .then(() => queryClient.invalidateQueries({ queryKey: queryKeys.cart.all }));
    } else {
      localUpdateQuantity(variantId, quantity);
    }
  };

  const isAuthLoading = user && cartQuery.isLoading;

  return {
    items: user ? (cartQuery.data?.items ?? []) : localItems,
    totalPrice: user ? (cartQuery.data?.totalPrice ?? 0) : localTotal,
    totalQuantity: user ? (cartQuery.data?.totalQuantity ?? 0) : localQty,
    isLoading: isAuthLoading || syncMutation.isPending,
    isSyncing: syncMutation.isPending,

    addItem,
    removeItem,
    updateQuantity,
  };
};
