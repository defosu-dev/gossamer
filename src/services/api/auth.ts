import { z } from 'zod';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
} from '@/lib/validator/auth';

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;
type ForgotInput = z.infer<typeof forgotPasswordSchema>;
type UpdatePassInput = z.infer<typeof updatePasswordSchema>;

export const authService = {
  login: async (data: LoginInput) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  register: async (data: RegisterInput) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  forgotPassword: async (data: ForgotInput) => {
    const res = await fetch('/api/auth/password/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  updatePassword: async (data: UpdatePassInput) => {
    const res = await fetch('/api/auth/password/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
