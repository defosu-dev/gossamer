'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="flex items-center justify-between">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {getPages().map((page, index) =>
          page === 'dots' ? (
            <span key={`dots-${index}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-gray-400 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black disabled:opacity-40"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
