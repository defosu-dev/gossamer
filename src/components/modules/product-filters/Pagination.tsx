'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages: (number | 'dots')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) pages.push('dots');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push('dots');

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 select-none sm:gap-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {getPages().map((page, index) =>
          page === 'dots' ? (
            <span key={`dots-${index}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all',
                page === currentPage
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
