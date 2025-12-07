import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { userService } from '@/services/api/user';
import { queryKeys } from '@/config/queryKeys';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import type { AddressDTO } from '@/types/api';
import type { AddressInput } from '@/lib/validator/user';

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
