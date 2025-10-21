import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/stores';
import { ProductProps, ProductVariantProps, CartItemProps } from '@/stores/slices/cartSlice';

export function useCart() {
    const {
        items,
        cartId,
        isGuest,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        migrateToShopify
    } = useStore();

    const queryClient = useQueryClient();

    // Fetch server cart for authenticated users
    const { data: serverCart, isLoading: isCartLoading } = useQuery({
        queryKey: ['cart', cartId],
        queryFn: () => fetch(`/api/cart/${cartId}`).then(r => r.json()),
        enabled: !isGuest && !!cartId,
        retry: 1,
    });

    // Sync cart to server
    const { mutate: syncCart, isPending: isSyncing } = useMutation({
        mutationFn: (cartData: { cartId: string | null; items: CartItemProps[] }) =>
            fetch('/api/cart/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartData),
            }).then(r => r.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.error('Cart sync failed:', error);
        },
    });

    const handleAddItem = (product: ProductProps, variant: ProductVariantProps) => {
        addItem(product, variant);
        if (!isGuest && cartId) {
            const newItem = { id: Date.now().toString(), product, variant, quantity: 1 };
            syncCart({ cartId, items: [...items, newItem] });
        }
    };

    const handleRemoveItem = (lineId: string) => {
        removeItem(lineId);
        if (!isGuest && cartId) {
            syncCart({ cartId, items: items.filter((item: CartItemProps) => item.id !== lineId) });
        }
    };

    const handleUpdateQuantity = (lineId: string, quantity: number) => {
        updateQuantity(lineId, quantity);
        if (!isGuest && cartId) {
            const updatedItems = items.map((item: CartItemProps) =>
                item.id === lineId ? { ...item, quantity } : item
            );
            syncCart({ cartId, items: updatedItems });
        }
    };

    const handleMigrateToShopify = (customerToken: string) => {
        migrateToShopify(customerToken).then(() => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        });
    };

    return {
        items: isGuest ? items : serverCart?.items || items,
        cartId,
        isGuest,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        updateQuantity: handleUpdateQuantity,
        clearCart,
        migrateToShopify: handleMigrateToShopify,
        isCartLoading,
        isSyncing,
        totalItems: (isGuest ? items : serverCart?.items || items).reduce((sum: number, item: CartItemProps) => sum + item.quantity, 0),
    };
}
