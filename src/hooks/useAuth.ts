import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { authService } from '@/services/api/auth';
import { cartService } from '@/services/api/cart';
import { useStore } from '@/store';
import { loginSchema, registerSchema, forgotPasswordSchema, updatePasswordSchema } from '@/lib/validator/auth';
import { queryKeys } from '@/config/queryKeys';
import { to } from '@/config/routes';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { createBrowserClient } from '@supabase/ssr';

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;
type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const getLocalItems = () => useStore.getState().items;
  const clearLocalCart = useStore.getState().clearCart;

  return useMutation<{ success: boolean }, unknown, LoginInput>({
    mutationFn: authService.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });

      const localItems = getLocalItems();

      if (localItems.length > 0) {
        const toastId = toast.loading('Syncing cart...');
        try {
          const itemsToSync = localItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          }));

          await cartService.sync(itemsToSync);
          
          clearLocalCart();
          toast.success('Cart synced!', { id: toastId });
        } catch (syncError) {
          console.error('Cart sync failed:', syncError);
          toast.error('Login successful, but cart sync failed', { id: toastId });
        }
      } else {
        toast.success('Welcome back!');
      }

      await queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });

      router.push(to.home()); 
      router.refresh(); 
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useRegister = () => {
  return useMutation<{ success: boolean }, unknown, RegisterInput>({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Account created! Please check your email to confirm.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearLocalCart = useStore.getState().clearCart;

  return useMutation<void, unknown, void>({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      clearLocalCart(); 
      
      toast.success('Logged out successfully');
      router.push(to.login());
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<{ success: boolean }, unknown, ForgotPasswordInput>({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success('If an account exists, a reset link has been sent.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdatePassword = () => {
  const router = useRouter();

  return useMutation<{ success: boolean }, unknown, UpdatePasswordInput>({
    mutationFn: authService.updatePassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
      router.push(to.profile());
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};


export const useGoogleLogin = () => {
  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};