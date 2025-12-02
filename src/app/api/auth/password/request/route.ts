import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { forgotPasswordSchema } from '@/lib/validator/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const supabase = await supabaseServer();
    const origin = request.nextUrl.origin;

    // Вказуємо redirectTo на сторінку зміни пароля
    // Але через callback, щоб сесія встановилася
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/api/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      // Для безпеки краще не показувати, чи існує email, але для DX можна
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to request reset' }, { status: 500 });
  }
}
