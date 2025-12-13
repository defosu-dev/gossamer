import Slider from '@/components/ui/Slider';
import type { CategoryDTO } from '@/types/api';

/**
 * Explore curated categories section.
 * Server component that fetches data directly via API route.
 */
async function ExploreSection() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  let categories: CategoryDTO[] = [];

  try {
    const res = await fetch(`${baseUrl}/api/products/categories?featured=true`, {
      cache: 'no-store',
    });

    if (res.ok) {
      categories = await res.json();
    }
  } catch {
    return null;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-7xl">
        <Slider categories={categories} />
      </div>
    </section>
  );
}

export default ExploreSection;
