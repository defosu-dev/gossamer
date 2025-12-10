import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}
