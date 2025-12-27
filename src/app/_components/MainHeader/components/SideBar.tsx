import { cn } from '@/lib/utils/cn';

import User from './User';
import Cart from '@/components/modules/Cart';
import Search from '@/components/modules/Search/Search';

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
      <Search />
      <Cart />
      <User />
    </div>
  );
}

export default SideBar;
