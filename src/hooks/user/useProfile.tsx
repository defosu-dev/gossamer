import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { userService } from '@/services/api/user';
import { queryKeys } from '@/config/queryKeys';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import type { UpdateProfileInput } from '@/lib/validator/user';
import type { UserDTO } from '@/types/api';
import { authService } from '@/services/api/auth';

export const useUser = () => {
  const { data, isLoading, error } = useQuery<UserDTO | null, Error>({
    queryKey: queryKeys.user.profile(),
    queryFn: authService.getMe,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data,
    error,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, UpdateProfileInput>({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
      toast.success('Profile updated successfully');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};
