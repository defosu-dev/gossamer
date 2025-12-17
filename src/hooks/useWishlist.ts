import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/api/wishlist';
import { queryKeys } from '@/config/queryKeys';
import { useUser } from '@/hooks/user';
import toast from 'react-hot-toast';
import type { ProductCardDTO } from '@/types/api';

export const useWishlist = () => {
  const { user } = useUser();

  return useQuery<ProductCardDTO[], Error>({
    queryKey: queryKeys.wishlist.all,
    queryFn: wishlistService.getAll,
    enabled: !!user, 
    staleTime: 1000 * 60 * 5,
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.toggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
      toast.success('Wishlist updated'); 
    },
    onError: () => toast.error('Failed to update wishlist'),
  });
};