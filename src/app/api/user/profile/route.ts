import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { updateProfileSchema } from '@/lib/validator/user';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function PATCH(request: NextRequest) {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, phone } = updateProfileSchema.parse(body);

    const { error } = await supabase
      .from('users')
      .update({ 
        name, 
        phone: phone || null
      })
      .eq('id', user.id);

    if (error) throw new Error(error.message);

    await supabase.auth.updateUser({
      data: { full_name: name }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}