import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { WishlistItemDTO } from '@/types/api';
import { queryKeys } from '@/config/queryKeys';
import { wishlistService } from '@/services/api/wishlist';

// 1. Хук отримання списку
export const useWishlist = () => {
  return useQuery<WishlistItemDTO[], Error>({
    queryKey: queryKeys.wishlist.all,
    queryFn: wishlistService.getAll,
    staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин
    retry: false, // Не повторювати запит, якщо 401 (юзер не залогінений)
  });
};

// 2. Хук для зміни (Toggle)
export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.toggle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
};

// 3. Хук-помічник: Перевірка наявності товару (для UI кнопки)
export const useCheckInWishlist = (variantId: string) => {
  const { data: wishlistItems } = useWishlist();

  // Повертаємо boolean: чи є цей variantId у списку
  const isInWishlist = wishlistItems?.some((item) => item.variantId === variantId) ?? false;

  return isInWishlist;
};
