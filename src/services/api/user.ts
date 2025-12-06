import { addressSchema, updateProfileSchema } from '@/lib/validator/user';
import type { AddressDTO } from '@/types/api';
import type { z } from 'zod';

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
type AddressInput = z.infer<typeof addressSchema>;

export const userService = {
  updateProfile: async (data: UpdateProfileInput): Promise<{ success: boolean }> => {
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update profile');
    }

    return res.json();
  },

  getAddresses: async (): Promise<AddressDTO[]> => {
    const res = await fetch('/api/user/addresses', {
      method: 'GET',
    });

    if (!res.ok) throw new Error('Failed to fetch addresses');
    return res.json();
  },

  addAddress: async (data: AddressInput): Promise<{ success: boolean }> => {
    const res = await fetch('/api/user/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add address');
    }
    return res.json();
  },

  updateAddress: async (id: string, data: Partial<AddressInput>): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/user/addresses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to update address');
    return res.json();
  },

  deleteAddress: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/user/addresses/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete address');
    return res.json();
  },
};