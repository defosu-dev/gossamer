"use client";
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

/**
 * Creates a Supabase client for browser/client-side usage.
 * 
 * Uses `createBrowserClient` from `@supabase/ssr` with type-safe Database.
 * 
 * @remarks
 * - Runs only on the client (`"use client"` directive).
 * - Uses environment variables:
 *   - `NEXT_PUBLIC_SUPABASE_URL`
 *   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 * 
 * @example
 * ```ts
 * import { supabaseBrowser } from '@/utils/supabase/supabaseBrowser';
 * const { data } = await supabaseBrowser.from('products').select('*');
 * ```
 */

export const supabaseBrowser = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);