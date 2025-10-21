import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProductReviews(handle: string) {
    return useQuery({
        queryKey: ['reviews', handle],
        queryFn: () => fetch(`/api/reviews?handle=${handle}&variant=summary`).then(r => r.json()),
        enabled: !!handle,
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: 1,
    });
}

export function useProductReviewsList(handle: string, page = 1, perPage = 10) {
    return useQuery({
        queryKey: ['reviewsList', handle, page, perPage],
        queryFn: () => fetch(`/api/reviews?handle=${handle}&variant=list&page=${page}&per_page=${perPage}`).then(r => r.json()),
        enabled: !!handle,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewData: { handle: string; rating: number; title?: string; text?: string; name: string; email: string }) =>
            fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            }).then(r => r.json()),
        onSuccess: (data, variables) => {
            // Invalidate reviews for this product
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.handle] });
            queryClient.invalidateQueries({ queryKey: ['reviewsList', variables.handle] });
        },
        onError: (error) => {
            console.error('Failed to create review:', error);
        },
    });
}
