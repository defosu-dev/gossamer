import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SearchBar from '@/components/modules/SearchBar/SearchBar';
import Container from '@/components/ui/Container';
import ExploreSection from '@/app/_components/ExploreCurated/ExploreSection';
import { ProductDetailsWrapper } from './_components/ProductDetailsWrapper'; // Імпорт обгортки

import type { ProductDetailDTO } from '@/types/api';

// Функція отримання даних
async function getProduct(slug: string): Promise<ProductDetailDTO | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000';

  try {
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} | Gossamer`,
    description: product.description?.slice(0, 160),
    openGraph: {
      images: product.variants[0]?.images[0]?.url ? [product.variants[0].images[0].url] : [],
    },
  };
}

// Page Component
export default async function DetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Перевірка цілісності даних
  if (!product.variants || product.variants.length === 0) {
    return (
      <Container className="py-20 text-center">
        Product data is incomplete (no variants found).
      </Container>
    );
  }

  return (
    <Container xCenter className="mt-5 flex w-full flex-col pb-20">
      <SearchBar />

      <ProductDetailsWrapper product={product} />

      <div className="mt-6">
        <ExploreSection />
      </div>
    </Container>
  );
}
