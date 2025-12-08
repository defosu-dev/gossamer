export const searchProducts = async (query: string, category?: string) => {
  const params = new URLSearchParams({ q: query });
  if (category) params.append('category', category);

  const res = await fetch(`/api/search?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Search failed');
  }

  return res.json();
};


