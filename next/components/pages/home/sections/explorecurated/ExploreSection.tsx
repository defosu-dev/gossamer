import React from "react";
import Slider from "../../../../common/blocks/Slider";
import { categories } from "./testdataexplore";

const ExploreSection = () => {
  return (
    <section className="px-6 py-12 mx-auto max-w-7xl">
      <div className="max-w-7xl">
        <Slider categories={categories} />
      </div>
    </section>
  );
};

export default ExploreSection;
