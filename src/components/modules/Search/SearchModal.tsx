'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowRight, Search } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

import SearchInput from './SearchInput';
import { SearchResults } from './SearchResults';
import { useDebounce } from '@/hooks/useDebounce';
import { useProductSearch } from '@/hooks/useProductSearch';

export interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = useProductSearch(debouncedQuery, 6);

  const allResults = data?.data || [];
  const hasMore = allResults.length > 5;
  const displayResults = allResults.slice(0, 5);

  const viewAllUrl = `${to.products()}?q=${encodeURIComponent(debouncedQuery)}`;

  return (
    <div
      className={cn(
        'absolute top-16 left-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-4 scale-95 opacity-0'
      )}
    >
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white p-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          isLoading={isLoading}
        />
      </div>

      {/* Content */}
      <div className="bg-white">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-300" />
          </div>
        ) : (
          <>
            {/* Results List */}
            {debouncedQuery.length > 2 && displayResults.length > 0 && (
              <div className="scrollbar-thin max-h-[60vh] overflow-y-auto">
                <div className="px-2 py-2">
                  <p className="px-2 pt-1 pb-2 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                    Products
                  </p>
                  <SearchResults items={displayResults} onSelect={onClose} />
                </div>
              </div>
            )}

            {/* Empty State */}
            {debouncedQuery.length > 2 && allResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 rounded-full bg-neutral-50 p-3">
                  <Search className="h-6 w-6 text-neutral-400" />
                </div>
                <p className="text-sm font-medium text-neutral-900">No products found</p>
                <p className="text-xs text-neutral-500">
                  We couldn't find anything matching "{debouncedQuery}"
                </p>
              </div>
            )}

            {/* Initial Helper Text */}
            {!debouncedQuery && (
              <div className="py-10 text-center">
                <p className="text-xs font-medium text-neutral-400">
                  Type at least 3 characters to start searching
                </p>
              </div>
            )}

            {/* Footer: View All Button */}
            {hasMore && (
              <div className="border-t border-neutral-100 bg-neutral-50 p-3">
                <Link
                  href={viewAllUrl}
                  onClick={onClose}
                  className="group flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 transition-all hover:bg-neutral-900 hover:text-white hover:ring-neutral-900"
                >
                  <span>
                    View all <span className="font-bold">{data?.data.length}+</span> results
                  </span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
