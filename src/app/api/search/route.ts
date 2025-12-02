import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

// Тип відповіді для документації (можна винести в types/api.ts)
export interface SearchResponse {
  data: Array<{
    id: string;
    title: string;
    slug: string;
    average_rating: number;
    reviews_count: number;
    current_price: number;
    image_url: string | null;
  }>;
  meta: {
    page: number;
    limit: number;
  };
}

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);

  // 1. Отримуємо та валідуємо параметри
  const query = searchParams.get('q')?.trim();
  const category = searchParams.get('category'); // slug категорії, необов'язковий

  // Пагінація з обмеженнями (щоб не поклали базу запитом limit=1000000)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));
  const offset = (page - 1) * limit;

  // 2. Якщо запит порожній — повертаємо пустий масив (економія ресурсів БД)
  if (!query) {
    return NextResponse.json({
      data: [],
      meta: { page, limit },
    });
  }

  try {
    // 3. Викликаємо нашу RPC функцію 'search_products'
    // Вона сама робить Soft Delete перевірку та сортування за релевантністю
    const { data, error } = await supabase.rpc('search_products', {
      search_term: query,
      category_filter_slug: category || undefined,
      limit_val: limit,
      offset_val: offset,
    });

    if (error) {
      console.error('Supabase Search RPC Error:', error);
      return NextResponse.json({ error: 'Internal Server Error during search' }, { status: 500 });
    }

    // 4. Формуємо відповідь
    // RPC вже повертає плоску структуру з ціною та картинкою,
    // тому додаткова трансформація масиву тут не потрібна.
    const response: SearchResponse = {
      data: data || [],
      meta: {
        page,
        limit,
        // Примітка: RPC функція для швидкості не рахує загальну кількість (total count).
        // Для пошукового випадаючого списку або нескінченного скролу це ок.
      },
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('Unexpected Search Error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
