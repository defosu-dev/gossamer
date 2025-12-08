import { cn } from '@/lib/utils/cn';

import Logo from './components/Logo';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

/**
 * Main site header containing the logo, primary navigation, and sidebar toggle.
 *
 * @remarks
 * This is a server component. All interactive elements (mobile menu, navigation links)
 * are delegated to the client components NavBar and SideBar.
 */
export function MainHeader() {
  return (
    <header className={cn('w-full bg-white')}>
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between',
          'border-x border-b border-zinc-300 bg-white px-6 py-4',
          'rounded-b-2xl shadow-sm'
        )}
      >
        <Logo />
        <NavBar />
        <SideBar />
      </div>
    </header>
  );
}

export default MainHeader;
