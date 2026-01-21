import React from 'react';

import { LatestBlogGrid } from './BlogCard/LatestGrid';

/**
 * Blog page placeholder.
 *
 * @remarks
 * Client-side route for /blog.
 */
export default function Page() {
  return (
    <div>
      Top Blogs 
      <LatestBlogGrid />
      Latest Blog
      <LatestBlogGrid />
    </div>
  );
}
