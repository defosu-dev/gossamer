import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCart, updateCart } from '@/utils/supabase/client/cart';
import { getCartEnrichedProducts } from '@/utils/supabase/server/products';
import { useAuth } from './useAuth';
import { useStore } from '@/store';
import { useEffect, useMemo, useCallback, useRef } from 'react';
import { CartItem } from '@/store/slices/cartSlice';

/**
 * Extended cart item that includes full product and variant details.
 */
export type CartItemWithProduct = CartItem & {
  /** Full variant information */
  variant: {
    id: string;
    name: string | null;
    sku: string | null;
    price: number;
    old_price: number | null;
    stock: number;
    images: { id: string; url: string; alt: string | null; position: number }[];
  };
  /** Full product information */
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

/**
 * Custom hook for managing a shopping cart with local persistence and server synchronization.
 *
 * Features:
 * - Local state via Zustand for immediate UI updates
 * - Server sync for authenticated users (Supabase)
 * - Automatic enrichment of cart items with product/variant data
 * - Debounced server sync to reduce network load
 * - Real-time calculation of totals
 *
 * Operates in two modes:
 * - **Guest**: fully local
 * - **Authenticated**: synced with server
 *
 * @returns Cart management API
 */
export const useCart = (): {
  /** Enriched cart items with full product/variant data */
  cart: CartItemWithProduct[];
  /** Add item to cart with optional quantity */
  addToCart: (variantId: string, qty?: number) => void;
  /** Remove item from cart */
  removeFromCart: (variantId: string) => void;
  /** Update item quantity (removes if <= 0) */
  updateQuantity: (variantId: string, qty: number) => void;
  /** Clear all items from cart */
  clearCart: () => void;
  /** Loading state for any cart-related data */
  isLoading: boolean;
  /** Whether user is authenticated and cart is synced */
  isAuthenticated: boolean;
  /** Any error from cart or product queries */
  error: unknown;
  /** Manually refetch server cart */
  refetchCart: () => void;
  /** Total number of items (sum of quantities) */
  totalItems: number;
  /** Total price (sum of price × quantity) */
  totalPrice: number;
} => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const isAuthenticated = !!userId && !authLoading;

  const queryClient = useQueryClient();
  const syncTimer = useRef<NodeJS.Timeout | null>(null);

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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync server cart to local state on first load (if local is empty)
  useEffect(() => {
    if (isAuthenticated && serverCart !== undefined && localCart.length === 0) {
      setCart(serverCart ?? []);
    }
  }, [serverCart, localCart.length, setCart, isAuthenticated]);

  // Extract variant IDs for product enrichment
  const variantIds = useMemo(
    () => localCart.map((i) => i.variant_id).filter(Boolean) as string[],
    [localCart]
  );

  // Fetch enriched product/variant data for cart items
  const {
    data: enrichedData = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['cart-products', ...variantIds],
    queryFn: () => getCartEnrichedProducts(variantIds),
    enabled: variantIds.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: (error) => {
      console.error('Cart sync failed:', error);
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
    (variantId: string, quantity: number = 1) => {
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

  // Calculate total items
  const totalItems = useMemo(() => localCart.reduce((sum, i) => sum + i.quantity, 0), [localCart]);

  // Calculate total price
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
};
