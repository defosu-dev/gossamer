export type AuthSlice = {
    customer: Customer | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (data: RegisterDataProps) => Promise<void>;
    setCustomer: (customer: Customer | null, token: string | null) => void;
};

export type Customer = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
};

export type RegisterDataProps = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export const createAuthSlice = (set: any, get: any): AuthSlice => ({
    customer: null,
    accessToken: null,
    isAuthenticated: false,

    login: (email: string, password: string) =>
        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => data.customer && data.accessToken && set({
                customer: data.customer,
                accessToken: data.accessToken,
                isAuthenticated: true
            }))
            .catch(error => {
                console.error('Failed to login', error);
                throw new Error(`Failed to login: ${error.message}`);
            }),

    logout: () => set({ customer: null, accessToken: null, isAuthenticated: false }),

    register: (data: RegisterDataProps) =>
        fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => result.customer && result.accessToken && set({
                customer: result.customer,
                accessToken: result.accessToken,
                isAuthenticated: true
            }))
            .catch(console.error),

    setCustomer: (customer: Customer | null, token: string | null) =>
        set({ customer, accessToken: token, isAuthenticated: !!customer }),
});
