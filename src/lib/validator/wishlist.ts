import { z } from 'zod';

export const toggleWishlistSchema = z.object({
  variantId: z.uuid({ message: 'Invalid Variant UUID' }),
});
