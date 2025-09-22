import React from "react";
import Slider from "./Slider";

const categories = [
  {
    label: "Music",
    image:
      "https://images.unsplash.com/photo-1616627984436-8d15d19d1ba4?w=600&auto=format&fit=crop",
  },
  {
    label: "Home",
    image:
      "https://images.unsplash.com/photo-1617196037306-df3fcb0cfe63?w=600&auto=format&fit=crop",
  },
  {
    label: "Storage",
    image:
      "https://images.unsplash.com/photo-1584622650111-993f97535b98?w=600&auto=format&fit=crop",
  },
  {
    label: "Decor",
    image:
      "https://images.unsplash.com/photo-1616627562850-f6acdd5a96eb?w=600&auto=format&fit=crop",
  },
  {
    label: "Workspace",
    image:
      "https://images.unsplash.com/photo-1616627901690-153f3d5a9b13?w=600&auto=format&fit=crop",
  },
];

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
