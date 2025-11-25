import { NextResponse } from 'next/server';

import { supabaseServer } from '@/utils/supabase/supabaseServer';

/**
 * @remarks
 * Middleware to initialize Supabase server client and get the current user.
 * This runs on every request except for static files, images, and favicon.
 */
export async function middleware() {
  const res = NextResponse.next();
  const supabase = await supabaseServer();
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
