import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { updatePasswordSchema } from '@/lib/validator/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const supabase = await supabaseServer();

    // Перевіряємо, чи є сесія (вона мала встановитися через callback)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const body = await request.json();
    const { password } = updatePasswordSchema.parse(body);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
