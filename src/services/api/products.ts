export const searchProducts = async (query: string, category?: string) => {
  const params = new URLSearchParams({ q: query });
  if (category) params.append('category', category);

  const res = await fetch(`/api/search?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Search failed');
  }

  return res.json();
};


import type { ProductListParams, ProductListResponse } from '@/types/api';

export const productsService = {

  getAll: async (params: ProductListParams = {}): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.category) searchParams.append('category', params.category);
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.featured) searchParams.append('featured', 'true');

    const res = await fetch(`/api/products?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch products');
    }

    return res.json();
  },
};