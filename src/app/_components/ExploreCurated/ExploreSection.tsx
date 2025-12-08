import Slider from '@/components/ui/Slider';
import { categories } from './testdataexplore';

/**
 * Explore curated categories section with horizontal slider.
 *
 * @remarks
 * This is a server component. All interactivity is delegated to the client-side
 * Slider component. Uses static test data from `testdataexplore`.
 */
export function ExploreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-7xl">
        <Slider categories={categories} />
      </div>
    </section>
  );
}

export default ExploreSection;
