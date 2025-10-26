import { NextResponse } from 'next/server';
import { supabaseBrowser } from '@/utils/supabase/supabaseBrowser';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = supabaseBrowser();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
}