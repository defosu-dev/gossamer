'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useCallback, useRef } from 'react';

import { fetchCart, updateCart } from '@/utils/supabase/client/cart';
import { getCartEnrichedProducts } from '@/utils/supabase/server/products';
import { useStore } from '@/store';
import { type CartItem } from '@/store/slices/cartSlice';

import { useAuth } from './useAuth';

/**
 * Extended cart item that includes full product and variant details.
 */
export type CartItemWithProduct = CartItem & {
  variant: {
    id: string;
    name: string | null;
    sku: string | null;
    price: number;
    old_price: number | null;
    stock: number;
    images: { id: string; url: string; alt: string | null; position: number }[];
  };
  product: {
    id: string;
    title: string;
    description: string | null;
    created_at: string;
    category: { name: string; slug: string };
    product_variants: Array<{
      id: string;
      name: string | null;
      sku: string | null;
      current_price: number | null;
      old_price: number | null;
      stock: number | null;
    }>;
  };
};

interface UseCartReturn {
  cart: CartItemWithProduct[];
  addToCart: (variantId: string, qty?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown;
  refetchCart: () => void;
  totalItems: number;
  totalPrice: number;
}

/**
 * Custom React hook for managing shopping cart state with optional server sync.
 *
 * @remarks
 * - Works for both guest users (local state only) and authenticated users (Supabase sync).
 * - Enriches cart items with full product and variant details.
 * - Debounces server updates to reduce requests.
 *
 * @returns An object containing:
 * - `cart`: Array of enriched cart items.
 * - `addToCart(variantId, qty?)`: Adds item to cart.
 * - `removeFromCart(variantId)`: Removes item from cart.
 * - `updateQuantity(variantId, qty)`: Updates item quantity.
 * - `clearCart()`: Clears the cart.
 * - `isLoading`: Whether cart or product data is loading.
 * - `isAuthenticated`: Whether user is authenticated and cart is synced.
 * - `error`: Any error from cart or product queries.
 * - `refetchCart()`: Refetch server cart.
 * - `totalItems`: Total number of items.
 * - `totalPrice`: Total price of items.
 */
export function useCart(): UseCartReturn {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? undefined;
  const isAuthenticated = userId !== undefined && userId !== null && !authLoading;

  const queryClient = useQueryClient();
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    cart: localCart,
    addToCart: addLocal,
    removeFromCart: removeLocal,
    updateQuantity: updateLocalQuantity,
    setCart,
  } = useStore();

  // Fetch server cart for authenticated users
  const {
    data: serverCart,
    isLoading: cartLoading,
    error: cartError,
    refetch,
  } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => fetchCart(userId!),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  // Sync server cart to local state on first load if local is empty
  useEffect(() => {
    if (isAuthenticated && serverCart && localCart.length === 0) {
      setCart(serverCart);
    }
  }, [serverCart, localCart.length, setCart, isAuthenticated]);

  // Extract variant IDs for product enrichment
  const variantIds = useMemo(
    () => localCart.map((i) => i.variant_id).filter((v): v is string => !!v),
    [localCart]
  );

  // Fetch enriched product/variant data
  const {
    data: enrichedData = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['cart-products', ...variantIds],
    queryFn: () => getCartEnrichedProducts(variantIds),
    enabled: variantIds.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  // Enrich local cart with full product and variant data
  const enrichedCart: CartItemWithProduct[] = useMemo(() => {
    const variantMap = new Map(enrichedData.map((item) => [item.id, item]));

    return localCart
      .map((item) => {
        const variantData = variantMap.get(item.variant_id);
        if (!variantData?.product) return null;

        return {
          ...item,
          variant: {
            id: variantData.id,
            name: variantData.name,
            sku: variantData.sku,
            price: variantData.current_price ?? 0,
            old_price: variantData.old_price,
            stock: variantData.stock ?? 0,
            images: (variantData.product_images ?? []).map((img) => ({
              id: img.id,
              url: img.url,
              alt: img.alt,
              position: img.position ?? 0,
            })),
          },
          product: {
            id: variantData.product.id,
            title: variantData.product.title,
            description: variantData.product.description,
            created_at: variantData.product.created_at,
            category: variantData.product.category,
            product_variants: (variantData.product.product_variants ?? []).map((v) => ({
              id: v.id,
              name: v.name,
              sku: v.sku,
              current_price: v.current_price,
              old_price: v.old_price,
              stock: v.stock,
            })),
          },
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [localCart, enrichedData]);

  // Mutation to sync cart with server
  const { mutate: syncCart } = useMutation({
    mutationFn: (items: CartItem[]) => updateCart(userId!, items),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] }),
    onError: (error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Cart sync failed:', error);
      }
    },
  });

  // Debounced server sync
  const syncWithServer = useCallback(() => {
    if (!isAuthenticated) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      syncCart(localCart);
    }, 800);
  }, [isAuthenticated, localCart, syncCart]);

  // Add item to cart with stock check
  const addToCart = useCallback(
    (variantId: string, quantity = 1) => {
      if (productsLoading) return;

      const existing = enrichedCart.find((i) => i.variant.id === variantId);
      const stock = existing?.variant.stock ?? Infinity;
      const currentQty = existing?.quantity ?? 0;
      const newQty = currentQty + quantity;

      if (newQty > stock) return;

      addLocal(variantId, quantity);
      syncWithServer();
    },
    [addLocal, enrichedCart, productsLoading, syncWithServer]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    (variantId: string) => {
      removeLocal(variantId);
      syncWithServer();
    },
    [removeLocal, syncWithServer]
  );

  // Update item quantity with validation
  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(variantId);
        return;
      }

      const item = enrichedCart.find((i) => i.variant.id === variantId);
      if (item && quantity > item.variant.stock) return;

      updateLocalQuantity(variantId, quantity);
      syncWithServer();
    },
    [enrichedCart, removeFromCart, updateLocalQuantity, syncWithServer]
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    if (isAuthenticated) syncCart([]);
  }, [setCart, isAuthenticated, syncCart]);

  const totalItems = useMemo(() => localCart.reduce((sum, i) => sum + i.quantity, 0), [localCart]);

  const totalPrice = useMemo(
    () => enrichedCart.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),
    [enrichedCart]
  );

  return {
    cart: enrichedCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading: authLoading || cartLoading || productsLoading,
    isAuthenticated,
    error: cartError || productsError,
    refetchCart: refetch,
    totalItems,
    totalPrice,
  };
}
