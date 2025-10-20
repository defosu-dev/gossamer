export type CartSlice = {
    items: CartItemProps[];
    cartId: string | null;
    isGuest: boolean;
    addItem: (product: ProductProps, variant: ProductVariantProps) => void;
    removeItem: (lineId: string) => void;
    updateQuantity: (lineId: string, quantity: number) => void;
    clearCart: () => void;
    setCartId: (cartId: string | null) => void;
    migrateToShopify: (customerToken: string) => Promise<void>;
};

export type CartItemProps = {
    id: string;
    product: ProductProps;
    variant: ProductVariantProps;
    quantity: number;
};

export type ProductProps = {
    id: string;
    title: string;
    handle: string;
    featuredImage?: { url: string; altText?: string | null } | null;
};

export type ProductVariantProps = {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
};

export const createCartSlice = (set: any, get: any): CartSlice => ({
    items: [],
    cartId: null,
    isGuest: true,

    addItem: (product: ProductProps, variant: ProductVariantProps) => {
        const { items } = get();
        const existingItem = items.find((item: CartItemProps) =>
            item.variant.id === variant.id
        );

        if (existingItem) {
            set((state: CartSlice) => ({
                items: state.items.map((item: CartItemProps) =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            }));
        } else {
            set((state: CartSlice) => ({
                items: [...state.items, {
                    id: Date.now().toString(),
                    product,
                    variant,
                    quantity: 1,
                }],
            }));
        }
    },

    removeItem: (lineId: string) => set((state: CartSlice) => ({
        items: state.items.filter((item: CartItemProps) => item.id !== lineId),
    })),

    updateQuantity: (lineId: string, quantity: number) => set((state: CartSlice) => ({
        items: state.items.map((item: CartItemProps) =>
            item.id === lineId ? { ...item, quantity } : item
        ),
    })),

    clearCart: () => set({ items: [], cartId: null }),

    setCartId: (cartId: string | null) => set({ cartId }),

    migrateToShopify: (customerToken: string) =>
        fetch('/api/cart/migrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: get().items, customerToken }),
        })
            .then(res => res.json())
            .then(data => set({
                items: data.items || [],
                cartId: data.cartId,
                isGuest: false
            }))
            .catch(console.error),
});
