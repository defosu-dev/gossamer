import { to } from '@/config/routes';
import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // next = куди редіректити після успіху (напр. /profile або /auth/update-password)
  const next = searchParams.get('next') ?? to.home();

  if (code) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Якщо помилка або коду немає
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
