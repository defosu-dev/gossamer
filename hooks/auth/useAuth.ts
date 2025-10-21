import { useMutation } from '@tanstack/react-query';
import { useStore } from '@/stores';
import { RegisterDataProps } from '@/stores/slices/authSlice';

export function useAuth() {
    const { customer, accessToken, isAuthenticated, login, logout, register, setCustomer } = useStore();

    const { mutate: loginMutation, isPending: isLoginPending, error: loginError } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    const { mutate: registerMutation, isPending: isRegisterPending, error: registerError } = useMutation({
        mutationFn: (data: RegisterDataProps) => register(data),
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });

    return {
        customer,
        accessToken,
        isAuthenticated,
        login: loginMutation,
        logout,
        register: registerMutation,
        setCustomer,
        isLoginPending,
        isRegisterPending,
        loginError,
        registerError,
    };
}
