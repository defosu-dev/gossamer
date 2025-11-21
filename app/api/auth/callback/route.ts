import { NextResponse } from 'next/server';

import { supabaseServer } from '@/utils/supabase/supabaseServer';

/**
 * @remarks
 * Handles GET requests for OAuth callback.
 * Exchanges the code for a Supabase session and redirects to the dashboard.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code: string | null = searchParams.get('code');

  if (code !== null && code !== '') {
    const supabase = await supabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
}
