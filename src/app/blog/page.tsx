import React from 'react';

import { SearchBar } from '@/components/modules/SearchBar/SearchBar';

import { LatestBlogGrid } from './_components/LatestGrid';
import TopBlogGrid from './_components/TopBlogGrid';
import { Pagination } from '@/components/modules/product-filters/Pagination';

/**
 * Blog page placeholder.
 *
 * @remarks
 * Client-side route for /blog.
 */
export default function Page() {
  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-16">
      <SearchBar title="Blogs on Gossamer " />

      <TopBlogGrid />
      <LatestBlogGrid />
      <div className="mt-auto py-4">
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
}
