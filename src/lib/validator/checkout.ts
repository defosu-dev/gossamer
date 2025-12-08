import { z } from 'zod';

export const initCheckoutSchema = z.object({
  email: z.email(),
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  items: z
    .array(
      z.object({
        variantId: z.uuid(),
        quantity: z.number().int().min(1),
      })
    )
    .optional(),
});
