import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { CategoryDTO } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  
  const isFeatured = searchParams.get('featured') === 'true';

  let query = supabase
    .from('categories')
    .select('id, name, slug, image_url') // 🆕 image_url
    .is('deleted_at', null);

  if (isFeatured) {
    query = query.eq('is_featured', true).order('sort_order', { ascending: true });
  } else {
    query = query.order('name', { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const categories: CategoryDTO[] = data.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    imageUrl: cat.image_url,
  }));

  return NextResponse.json(categories);
}