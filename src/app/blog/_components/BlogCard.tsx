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
  variant?: 'default' | 'big' | 'compact';
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
  variant = 'default',
  priority = false,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-2xl border border-gray-300 p-1 transition-colors',
        {
          // BIG — широкая карточка слева
          'flex h-full flex-col gap-4 lg:flex-row': variant === 'big',

          // DEFAULT — обычная вертикальная
          'flex flex-col gap-4': variant === 'default',

          // COMPACT — маленькие справа
          'flex h-[230px] flex-row gap-4': variant === 'compact',
        },
        className
      )}
    >
      {/* Image */}
      <div
        className={cn('relative overflow-hidden rounded-lg', {
          // big: широкая картинка
          'aspect-[16/9] w-full lg:w-[55%]': variant === 'big',

          // default
          'aspect-[4/3] w-full': variant === 'default',

          // compact
          'h-full w-[45%]': variant === 'compact',
        })}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          priority={priority}
          iconSize={6}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex flex-1 flex-col gap-2 px-1',
          variant === 'compact' && 'justify-between'
        )}
      >
        {/* Read time */}
        <span className="text-muted-foreground text-xs font-light">{readTime} Min</span>

        {/* Title */}
        <h3
          className={cn(
            'group-hover:text-primary font-bold transition-colors',
            variant === 'big' ? 'text-2xl leading-tight' : 'text-lg leading-snug',
            'line-clamp-2'
          )}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            'text-muted-foreground',
            variant === 'big' ? 'line-clamp-3 text-base' : 'line-clamp-2 text-sm'
          )}
        >
          {excerpt}
        </p>

        {/* Author */}
        <div className="mt-auto flex items-center gap-3 pt-2">
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
