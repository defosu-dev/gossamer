import { z } from 'zod';

export const addToCartSchema = z.object({
  variantId: z.string().uuid({ message: 'Invalid Variant UUID' }),
  quantity: z.number().int().min(1).max(99),
});

export const updateCartItemSchema = z.object({
  itemId: z.string().uuid({ message: 'Invalid Item UUID' }),
  quantity: z.number().int().min(1).max(99),
});

export const removeCartItemSchema = z.object({
  itemId: z.string().uuid({ message: 'Invalid Item UUID' }),
});

export const syncCartSchema = z.object({
  items: z.array(
    z.object({
      variantId: z.string().uuid({ message: 'Invalid Variant UUID' }),
      quantity: z.number().int().min(1),
    })
  ),
});
