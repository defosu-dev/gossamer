'use client';
import { cn } from '@/lib/utils/cn';

import Copyright from './Copyright';
import DistributionBlock from './DistributionBlock';
import List from './List';
import SocialMediaList from './SocialMediaList';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Main website footer containing a promotional distribution block,
 * navigation links, social media icons, and copyright notice.
 *
 * @remarks
 * This is a server component. All interactive parts are delegated to child client components
 * (e.g. form inside DistributionBlock, links inside List/SocialMediaList).
 */
export function MainFooter() {
  const path = usePathname();
  const isHome = path === '/';

  return (
    <footer
      className={cn(
        'mx-auto mt-8 w-full max-w-6xl overflow-hidden rounded-2xl rounded-b-none',
        'border border-zinc-300 bg-white shadow-sm'
      )}
    >
      {isHome && <DistributionBlock />}
      <div
        className={cn(
          'flex flex-col justify-between px-4 py-8',
          'md:flex-row md:items-center md:px-16'
        )}
      >
        <List />
        <SocialMediaList />
      </div>
      <Copyright />
    </footer>
  );
}

export default MainFooter;
