import { Search } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import User from './User';
import Cart from '@/components/modules/Cart';

/**
 * Header utility bar with search trigger, cart, and user profile links.
 *
 * @remarks
 * This is a server component. The button has no client-side handler attached directly —
 * search functionality should be implemented via a client component higher in the tree
 * (e.g. search modal triggered by context or event bus). Cart and User may be client
 * components internally — this is allowed and encouraged.
 */
export function SideBar() {
  return (
    <div className={cn('flex items-center gap-5')}>
      <button
        type="button"
        aria-label="Open search"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full',
          'border border-zinc-300 bg-white text-zinc-700 transition-all',
          'hover:border-zinc-400 hover:text-zinc-900 hover:shadow-sm',
          'focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none'
        )}
      >
        <Search size={20} strokeWidth={2} />
      </button>

      <Cart />
      <User />
    </div>
  );
}

export default SideBar;
