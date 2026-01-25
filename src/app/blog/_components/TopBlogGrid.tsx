'use client';

import BlogCard from './BlogCard';

export default function TopBlogGrid() {
  return (
    <section className="w-ful container mx-auto max-w-7xl p-1 px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* BIG CARD */}
        <BlogCard
          variant="big"
          href="/blog/1"
          title="Tech Marvels for Your Home"
          excerpt="Discover the cutting-edge technologies that are reshaping homes."
          image=""
          readTime={10}
          authorName="Arlene McCoy"
          authorAvatar="/images/avatar-1.jpg"
          priority
          className="h-full"
        />

        {/* RIGHT COLUMN */}
        <div className="flex h-full flex-col justify-between">
          <BlogCard
            variant="compact"
            href="/blog/2"
            title="Crafting Your Own Home Decor"
            excerpt="Get creative with DIY home decor ideas."
            image=""
            readTime={3}
            authorName="Jane Cooper"
            authorAvatar="/images/avatar-2.jpg"
          />

          <BlogCard
            variant="compact"
            href="/blog/3"
            title="Essential Kitchen Gadgets"
            excerpt="Every home chef needs these tools."
            image=""
            readTime={15}
            authorName="Robert Fox"
            authorAvatar="/images/avatar-3.jpg"
          />
        </div>
      </div>
    </section>
  );
}
