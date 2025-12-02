// Описуємо типи фільтрів, щоб уникнути 'any'
export interface ProductListFilters {
  page?: number;
  limit?: number;
  category?: string; // slug
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
  // 1. Користувач та Акаунт
  user: {
    all: ['user'] as const,
    profile: () => ['user', 'profile'] as const,
    addresses: () => ['user', 'addresses'] as const,
    // Конкретна адреса (якщо треба редагувати)
    address: (id: string) => ['user', 'addresses', id] as const,
  },

  // 2. Каталог Товарів
  products: {
    all: ['products'] as const,

    // Списки (Каталог)
    list: (filters: ProductListFilters) => ['products', 'list', filters] as const,

    // Детальна сторінка
    detail: (slug: string) => ['products', 'detail', slug] as const,

    // Пошук (окремий ключ, щоб не змішувати з каталогом)
    search: (params: ProductSearchParams) => ['products', 'search', params] as const,

    // Категорії
    categories: () => ['products', 'categories'] as const,

    // Відгуки до товару
    reviews: (productId: string) => ['products', 'reviews', productId] as const,
  },

  // 3. Кошик
  cart: {
    all: ['cart'] as const,
    // Якщо треба буде оптимістично оновлювати конкретний айтем
    item: (variantId: string) => ['cart', 'item', variantId] as const,
  },

  // 4. Вішліст
  wishlist: {
    all: ['wishlist'] as const,
    // Перевірка, чи товар у вішлісті (для кнопки "сердечко")
    check: (productId: string) => ['wishlist', 'check', productId] as const,
  },

  // 5. Замовлення
  orders: {
    all: ['orders'] as const,
    list: () => ['orders', 'list'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
};
