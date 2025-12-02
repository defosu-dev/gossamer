import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { registerSchema } from '@/lib/validator/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = registerSchema.parse(body);

    const supabase = await supabaseServer();
    const origin = request.nextUrl.origin; // http://localhost:3000

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Це піде в public.users через тригер
        },
        // Після підтвердження пошти перенаправляємо на callback
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
