import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().optional().or(z.literal('')), 
});

export const addressSchema = z.object({
  title: z.string().min(1, "Title is required (e.g. Home)"),
  addressLine1: z.string().min(5, "Address is too short"),
  addressLine2: z.string().optional().or(z.literal('')),
  city: z.string().min(2),
  state: z.string().optional().or(z.literal('')),
  zipCode: z.string().min(3),
  country: z.string().default('Ukraine'),
  phone: z.string().optional().or(z.literal('')),
  isDefault: z.boolean().default(false),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;