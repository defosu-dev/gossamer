import React from 'react';

import FaqPage from '@/components/pages/faq';

/**
 * FAQ page wrapper.
 *
 * @remarks
 * SSG page that renders the FaqPage component.
 */
export const dynamic = 'force-static';

/**
 *
 */
export default function Page() {
  return (
    <div>
      <FaqPage />
    </div>
  );
}
