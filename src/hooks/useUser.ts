import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { userService } from '@/services/api/user';
import { authService } from '@/services/api/auth';
import { queryKeys } from '@/config/queryKeys';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';

import type { AddressDTO, UserDTO } from '@/types/api';
import type { AddressInput, UpdateProfileInput } from '@/lib/validator/user';

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
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useAddresses = () => {
  return useQuery<AddressDTO[], Error>({
    queryKey: queryKeys.user.addresses(),
    queryFn: userService.getAddresses,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, AddressInput>({
    mutationFn: userService.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.addresses() });
      toast.success('Address added');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, { id: string; data: Partial<AddressInput> }>({
    mutationFn: ({ id, data }) => userService.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.addresses() });
      toast.success('Address updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: userService.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.addresses() });
      toast.success('Address removed');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};