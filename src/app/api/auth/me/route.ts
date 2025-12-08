import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { NextResponse } from 'next/server';
import { type QueryData } from '@supabase/supabase-js';

export async function GET() {
  const supabase = await supabaseServer();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ user: null });
  }

  const queryBuilder = supabase
    .from('users')
    .select('id, email, name, avatar_url, phone')
    .eq('id', user.id)
    .single();

  type UserProfile = QueryData<typeof queryBuilder>;

  const { data: profile, error: dbError } = await queryBuilder;

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ user: profile as UserProfile });
}