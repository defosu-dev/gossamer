import type { ReactNode } from 'react';

interface BlogLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export default function BlogLayout({ sidebar, content }: BlogLayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
      <aside>{sidebar}</aside>
      <main className="flex flex-col gap-10">{content}</main>
    </div>
  );
}
