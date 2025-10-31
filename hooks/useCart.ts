import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, updateCart } from "@/utils/supabase/client/cart";
import { useAuth } from "./useAuth";
import { useStore } from "@/store";
import { useEffect } from "react";
import { CartItem } from "@/store/slices/cartSlice";

export const useCart = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const {
    cart,
    setCart,
    addToCart: addLocal,
    removeFromCart: removeLocal,
    updateQuantity,
  } = useStore();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data !== undefined) {
      setCart(data); // data should now be CartItem[]
    }
  }, [data, setCart]);

  const { mutate: syncCart } = useMutation({
    mutationFn: (items: CartItem[]) => updateCart(userId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  const addToCart = (variantId: string, quantity = 1) => {
    addLocal(variantId, quantity);

    if (!userId) return;
    // Optimistically update, then sync
    const optimisticCart = (() => {
      const existing = cart.find((i) => i.variant_id === variantId);
      if (existing) {
        return cart.map((i) =>
          i.variant_id === variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...cart, { variant_id: variantId, quantity }];
    })();
    syncCart(optimisticCart);
  };

  const removeFromCart = (variantId: string) => {
    removeLocal(variantId);
    const newCart = cart.filter((i) => i.variant_id !== variantId);
    syncCart(newCart);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity: (variantId: string, quantity: number) => {
      updateQuantity(variantId, quantity);
      const newCart = cart.map((i) =>
        i.variant_id === variantId ? { ...i, quantity } : i
      );
      syncCart(newCart);
    },
    isLoading: queryLoading || authLoading,
    isAuthenticated: !!user,
  };
};
