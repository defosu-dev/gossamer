'use client';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { to } from '@/config/routes';
import type { CategoryDTO } from '@/types/api';

interface CategoryBarProps {
  categories: CategoryDTO[];
  onSelect?: (item: CategoryDTO | null) => void;
  className?: string;
}

export default function CategoryBar({ categories, onSelect, className }: CategoryBarProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSelect = (slug: string | null) => {
    setActiveCategory(slug);

    if (!onSelect) return;
    if (slug == null) {
      onSelect(null);
      return;
    }

    const selected = categories.find((item) => item.slug === slug);
    selected && onSelect(selected);
  };

  const handleSeeAll = () => {
    router.push(to.products());
  };

  return (
    <Container
      className={cn('flex w-full flex-wrap items-center justify-between gap-4', className)}
    >
      <div className={cn('flex flex-wrap gap-3')}>
        <Button
          variant={activeCategory === null ? 'primary' : 'secondary'}
          onClick={() => handleSelect(null)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.slug}
            variant={activeCategory === cat.slug ? 'primary' : 'secondary'}
            onClick={() => handleSelect(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <Button variant="secondary" onClick={() => handleSeeAll()}>
        See All Products
      </Button>
    </Container>
  );
}
