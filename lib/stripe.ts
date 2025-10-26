// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion });