import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { CategoryDTO } from '@/types/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .is('deleted_at', null)
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const categories: CategoryDTO[] = data;

  return NextResponse.json(categories);
}
