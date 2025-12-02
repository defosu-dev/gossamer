'use client';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { to } from '@/config/routes';

interface CategoryBarProps {
  className?: string;
}

export default function CategoryBar({ className }: CategoryBarProps) {
  const categories = ['All', 'Home', 'Music', 'Phone', 'Storage', 'Other'];
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  return (
    <Container
      className={cn('flex w-full flex-wrap items-center justify-between gap-4', className)}
    >
      <div className={cn('flex flex-wrap gap-3')}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <Button variant="secondary" onClick={() => router.push(to.products())}>
        See All Products
      </Button>
    </Container>
  );
}
