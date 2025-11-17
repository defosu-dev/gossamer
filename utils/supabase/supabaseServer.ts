'use server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type Database } from '@/types/supabase';

/**
 * Creates a Supabase client for server-side usage (Next.js App Router).
 *
 * Uses `createServerClient` with cookie handling via `next/headers`.
 *
 * @remarks
 * - Runs only on the server (`'use server'` directive).
 * - Returns a **function** that must be awaited: `const supabase = await supabaseServer()`.
 * - Safely wraps cookie `set`/`remove` to prevent errors when called on client.
 * - Uses environment variables:
 *   - `NEXT_PUBLIC_SUPABASE_URL`
 *   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 *
 * @example
 * ```ts
 * // In a server component or route handler
 * const supabase = await supabaseServer();
 * const { data } = await supabase.from('profiles').select('*');
 * ```
 */

export const supabaseServer = async () => {
  const store = await cookies();

  const safe =
    <T extends (...args: any[]) => void>(fn: T) =>
    (...args: Parameters<T>) => {
      try {
        fn(...args);
      } catch {
        /* ignore on client */
      }
    };

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => store.get(name)?.value,
        set: safe((name: string, value: string, options: CookieOptions) =>
          store.set({ name, value, ...options })
        ),
        remove: safe((name: string, options: CookieOptions) => store.delete({ name, ...options })),
      },
    }
  );
};
