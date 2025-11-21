'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { type Database } from '@/types/supabase';

/**
 * Server-side Supabase client factory with safe cookie handling.
 *
 * @remarks
 * - Creates a new Supabase client on every server action / route handler call
 * - Uses Next.js 13+ `cookies()` from `next/headers`
 * - Wraps `set` and `remove` cookie methods in a safe wrapper that swallows errors
 *   (prevents crashes when called accidentally on the client side)
 * - Fully typed with generated `Database` type
 */
export const supabaseServer = async () => {
  const cookieStore = await cookies();

  // Silently ignore cookie errors (e.g. when mistakenly imported on client)
  const safe =
    <T extends (...args: any[]) => void>(fn: T) =>
    (...args: Parameters<T>) => {
      try {

        // @ts-ignore – fn is guaranteed to be called with correct args
        fn(...args);
      } catch {

        // no-op
      }
    };

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: safe((name: string, value: string, options: CookieOptions) => {
          cookieStore.set({ name, value, ...options });
        }),
        remove: safe((name: string, options: CookieOptions) => {
          cookieStore.delete({ name, ...options });
        }),
      },
    }
  );
};
