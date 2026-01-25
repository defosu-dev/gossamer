import ExploreSection from '../_components/ExploreCurated/ExploreSection';

import BlogContent from './_components/BlogContent';
import BlogLayout from './_components/BlogLayout';
import BlogMeta from './_components/BlogMeta';
import BlogTop from './_components/BlogTop';

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-16">
      <BlogLayout
        sidebar={<BlogMeta />}
        content={
          <>
            <BlogTop />
            <BlogContent />
            <ExploreSection />
          </>
        }
      />
    </div>
  );
}
