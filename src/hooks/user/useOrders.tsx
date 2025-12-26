import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/api/user';
import { queryKeys } from '@/config/queryKeys';
import type { OrderDTO } from '@/types/api';

export const useOrders = () => {
  return useQuery<OrderDTO[], Error>({
    queryKey: queryKeys.orders.list(),
    queryFn: userService.getOrders,
    staleTime: 1000 * 60 * 5,
  });
};

export const useOrderDetail = (id: string, email?: string) => {
  return useQuery<OrderDTO, Error>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => userService.getOrderById(id, email),
    enabled: !!id,
    retry: 1,
  });
};
