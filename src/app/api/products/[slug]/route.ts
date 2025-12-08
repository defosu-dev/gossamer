import { supabaseServer } from '@/lib/supabase/supabaseServer';
import type { ProductDetailDTO, ProductVariantDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await supabaseServer();

  // 1. Формуємо запит
  const queryBuilder = supabase
    .from('products')
    .select(
      `
      id, title, slug, description, average_rating, reviews_count,
      categories ( id, name, slug ),
      product_variants (
        id, name, sku, current_price, old_price, stock, deleted_at,
        product_images ( id, url, alt, position ),
        product_variant_attributes (
          attribute_values (
            id, value,
            attributes ( id, name, slug )
          )
        )
      )
    `
    )
    .eq('slug', slug)
    .is('deleted_at', null)
    .single();

  // 2. Витягуємо тип
  type ProductWithRelations = QueryData<typeof queryBuilder>;

  // 3. Виконуємо
  const { data, error } = await queryBuilder;

  if (error || !data) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const productRaw = data as ProductWithRelations;

  // 4. Трансформація Варіантів
  // Нам треба відфільтрувати видалені варіанти вручну, бо у вкладеному запиті .is('deleted_at', null)
  // працює складно в Supabase JS синтаксисі (потребує окремого модифікатора)
  const validVariants = productRaw.product_variants.filter((v) => v.deleted_at === null);

  const transformedVariants: ProductVariantDTO[] = validVariants.map((v) => {
    // 4.1 Атрибути
    const attributes = v.product_variant_attributes.map((pva) => {
      // Supabase типи знають, що ці поля існують, але можуть бути null через Left Join
      // Ми використовуємо "!", бо знаємо структуру бази (NOT NULL FKs), або безпечний фолбек
      const attrVal = pva.attribute_values;
      const attrDef = attrVal?.attributes;

      return {
        valueId: attrVal?.id ?? '',
        value: attrVal?.value ?? '',
        name: attrDef?.name ?? '',
        slug: attrDef?.slug ?? '',
      };
    });

    // 4.2 Картинки
    const sortedImages = v.product_images
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((img) => ({
        id: img.id,
        url: img.url ?? '',
        alt: img.alt,
      }));

    return {
      id: v.id,
      name: v.name,
      sku: v.sku,
      price: v.current_price,
      oldPrice: v.old_price,
      stock: v.stock,
      images: sortedImages,
      attributes,
    };
  });

  // 5. Збір доступних опцій (Options) для UI
  // Використовуємо Map для унікальності
  const optionsMap = new Map<string, { name: string; values: Map<string, string> }>();

  transformedVariants.forEach((v) => {
    v.attributes.forEach((attr) => {
      if (!attr.slug) return;

      if (!optionsMap.has(attr.slug)) {
        optionsMap.set(attr.slug, { name: attr.name, values: new Map() });
      }

      const option = optionsMap.get(attr.slug);
      if (option && attr.valueId) {
        option.values.set(attr.valueId, attr.value);
      }
    });
  });

  // Перетворюємо Map в масив DTO
  const options = Array.from(optionsMap.entries()).map(([slug, opt]) => ({
    slug,
    name: opt.name,
    values: Array.from(opt.values.entries()).map(([id, value]) => ({ id, value })),
  }));

  // 6. Фінальний об'єкт
  const response: ProductDetailDTO = {
    id: productRaw.id,
    title: productRaw.title,
    slug: productRaw.slug,
    description: productRaw.description,
    rating: productRaw.average_rating ?? 0,
    reviewsCount: productRaw.reviews_count ?? 0,
    category: Array.isArray(productRaw.categories)
      ? productRaw.categories[0]
      : (productRaw.categories as any),
    variants: transformedVariants,
    options,
  };

  return NextResponse.json(response);
}
