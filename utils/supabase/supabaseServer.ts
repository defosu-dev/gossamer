'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type Database } from '@/lib/supabase'

export const supabaseServer = async () => {
  const store = await cookies()

  const safe =
    <T extends (...args: any[]) => void>(fn: T) =>
    (...args: Parameters<T>) => {
      try {
        fn(...args)
      } catch {
        /* ignore on client */
      }
    }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => store.get(name)?.value,
        set: safe((name: string, value: string, options: CookieOptions) =>
          store.set({ name, value, ...options })
        ),
        remove: safe((name: string, options: CookieOptions) =>
          store.delete({ name, ...options })
        ),
      },
    }
  )
}