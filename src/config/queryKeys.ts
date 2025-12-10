export interface ProductListFilters {
  page?: number;
  limit?: number;
  category?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating_desc';
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductSearchParams {
  q: string;
  category?: string;
  page?: number;
}

export const queryKeys = {
  user: {
    all: ['user'] as const,
    profile: () => ['user', 'profile'] as const,
    addresses: () => ['user', 'addresses'] as const,
    address: (id: string) => ['user', 'addresses', id] as const,
  },

  products: {
    all: ['products'] as const,

    list: (filters: ProductListFilters) => ['products', 'list', filters] as const,

    detail: (slug: string) => ['products', 'detail', slug] as const,

    search: (params: ProductSearchParams) => ['products', 'search', params] as const,

    categories: () => ['products', 'categories'] as const,

    reviews: (productId: string) => ['products', 'reviews', productId] as const,
  },

  cart: {
    all: ['cart'] as const,
    item: (variantId: string) => ['cart', 'item', variantId] as const,
  },

  wishlist: {
    all: ['wishlist'] as const,
    check: (productId: string) => ['wishlist', 'check', productId] as const,
  },

  orders: {
    all: ['orders'] as const,
    list: () => ['orders', 'list'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
};
