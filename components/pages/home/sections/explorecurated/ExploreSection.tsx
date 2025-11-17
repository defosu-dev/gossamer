import React from 'react';
import Slider from '../../../../common/Slider';
import { categories } from './testdataexplore';

const ExploreSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-7xl">
        <Slider categories={categories} />
      </div>
    </section>
  );
};

export default ExploreSection;
