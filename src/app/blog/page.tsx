import React from 'react';

import { SearchBar } from '@/components/modules/SearchBar/SearchBar';

import { LatestBlogGrid } from './BlogCard/LatestGrid';
import TopBlogGrid from './BlogCard/TopBlogGrid';

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
    </div>
  );
}
