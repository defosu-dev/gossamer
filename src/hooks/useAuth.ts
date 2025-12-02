import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth';
import { queryKeys } from '@/config/queryKeys';
import { to } from '@/config/routes';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      // Оновлюємо кеш юзера
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      // Синхронізуємо кошик (логіку додасте пізніше, якщо треба)
      router.push(to.profile());
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    // onSuccess зазвичай показує повідомлення "Перевірте пошту"
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear(); // Очищаємо весь кеш (кошик, юзер)
      router.push('/');
      router.refresh(); // Оновлюємо серверні компоненти
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};

export const useUpdatePassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authService.updatePassword,
    onSuccess: () => {
      router.push('/profile');
    },
  });
};
