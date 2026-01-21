'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface BlogCardProps {
  href: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: number;
  authorName: string;
  authorAvatar: string;
  priority?: boolean;
  className?: string;
}

export function BlogCard({
  href,
  title,
  excerpt,
  image,
  readTime,
  authorName,
  authorAvatar,
  priority = false,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        // размеры + временная обводка
        'group flex h-[430px] w-full max-w-[360px] flex-col rounded-2xl border border-gray-300 p-1',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <ImageWithFallback
          src={image}
          alt={title}
          sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
          priority={priority}
          iconSize={6}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 px-1">
        {/* Read time */}
        <span className="text-xs font-light">{readTime} Min</span>

        {/* Title */}
        <h3 className="group-hover:text-primary line-clamp-2 text-lg leading-snug font-bold transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground line-clamp-2 text-sm">{excerpt}</p>

        {/* Author */}
        <div className="mt-auto flex items-center gap-3">
          <ImageWithFallback
            src={authorAvatar}
            alt={authorName}
            width={32}
            height={32}
            className="rounded-full"
          />

          <div className="text-sm leading-tight">
            <span className="text-muted-foreground block">Written by</span>
            <span className="font-bold">{authorName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
