import { cn } from '@/utils/cn';

import Form from './Form';

/**
 * DistributionBlock displays a prominent call-to-action section featuring a subscription form
 * alongside descriptive text about personalized EV charging solutions.
 *
 * @remarks
 * This is a server component. It renders static content and delegates all interactivity
 * to the client-side {@link Form} component.
 */
export function DistributionBlock() {
  return (
    <section
      className={cn(
        'mx-4 mt-3 mb-8 flex flex-col items-start justify-between rounded-2xl',
        'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-8',
        'md:mx-16 md:flex-row md:items-center'
      )}
    >
      <div className="flex-1">
        <h2 className="mb-4 max-w-64 text-3xl font-bold text-white">Ready to Get Our New Stuff?</h2>
        <Form />
      </div>

      <div className="mt-6 max-w-xs md:mt-0 md:ml-8">
        <span className="mb-2 block font-semibold text-white">Gossamer for Homes and Needs</span>
        <p className="text-sm text-zinc-200">
          We will listen to your needs, identify the best approach, and then create a bespoke smart
          EV charging solution that is right for you.
        </p>
      </div>
    </section>
  );
}

export default DistributionBlock;
