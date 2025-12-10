import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import SummaryOrder from './_components/SummaryOrder';
import CartItemsList from './_components/CartItemsList';

/**
 * CartPage.
 *
 * Full cart page displaying all items, selection controls, and order summary.
 * Integrates with `useCart` hook for state management.
 *
 * @remarks
 * - Responsive layout: column on mobile, row on md+.
 * - Supports bulk selection via "Select All" checkbox.
 * - Empty state with centered message.
 * - Breadcrumbs for navigation.
 * - Sticky summary on larger screens.
 */
function CartPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
  ];

  return (
    <Container>
      <div className="flex w-full flex-col">
        <Breadcrumbs items={breadcrumbs} />

        <h2 className={cn('text-5xl font-bold text-neutral-900', 'mt-4')}>My Cart</h2>

        <div className="mt-10 flex w-full flex-col-reverse gap-8 md:flex-row">
          {/* Cart Items List */}
          <CartItemsList />
          {/* Order Summary */}
          <SummaryOrder />
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
