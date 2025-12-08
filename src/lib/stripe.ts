import Stripe from 'stripe';

if (process.env.STRIPE_SECRET_KEY == null) {
  throw new Error('STRIPE_SECRET_KEY is missing');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion,
  typescript: true,
});
