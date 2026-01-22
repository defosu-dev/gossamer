'use client';

import { cn } from '@/lib/utils/cn';

import BlogCard from './BlogCard';

interface LatestBlogGridProps {
  className?: string;
}

export function LatestBlogGrid({ className }: LatestBlogGridProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold">Latest Blogs</h2>
      <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCard
            key={index}
            href="/blog/test"
            title="Eco-Friendly Living: Sustainable Choices for a Greener Home"
            excerpt="Dive into the world of eco-friendly living. Explore sustainable products and lifestyle choices..."
            image="/images/blog/eco.jpg"
            readTime={10}
            authorName="Darrell Steward"
            authorAvatar="/images/authors/darrell.jpg"
          />
        ))}
      </div>
    </>
  );
}

export default LatestBlogGrid;
