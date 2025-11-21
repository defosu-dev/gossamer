'use client';

import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@/types/supabase';

/**
 * Browser-side Supabase client (singleton).
 *
 * @remarks
 * - Created once per app lifecycle (client bundle)
 * - Uses `@supabase/ssr` browser client (works with Next.js App Router)
 * - Fully typed with generated `Database` type
 * - Automatically handles auth state, RLS, realtime subscriptions
 * - Safe to import anywhere in client components or hooks
 */
export const supabaseBrowser = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
