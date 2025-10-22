import { useQuery } from '@tanstack/react-query';

export function useProducts(first = 12) {
    return useQuery({
        queryKey: ['products', first],
        queryFn: () => fetch(`/api/products?first=${first}`).then(r => r.json()),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}

export function useProduct(handle: string) {
    return useQuery({
        queryKey: ['product', handle],
        queryFn: () => fetch(`/api/products?handle=${handle}`).then(r => r.json()),
        enabled: !!handle,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}

export function useProductWithReviews(handle: string) {
    return useQuery({
        queryKey: ['productWithReviews', handle],
        queryFn: () => fetch(`/api/products?handle=${handle}&withReviews=true`).then(r => r.json()),
        enabled: !!handle,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}
