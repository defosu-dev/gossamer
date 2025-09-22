import React from "react";
import Title from "./Title";
import Description from "./Description";
import FeatureList from "./FeatureList";
import ImageBlock from "./ImageBlock";

export default function NewArrival() {
  return (
    <section className="flex flex-col md:flex-row justify-between gap-12 py-16 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col max-w-lg">
        <span className="text-xs font-semibold text-zinc-600 mb-2">
          NEW ARRIVAL
        </span>
        <Title>Marshall</Title>
        <Description>
          Discover audio excellence with Marshall – a revolutionary speaker
          merging cutting-edge tech and captivating design. Immerse yourself in
          rich soundscapes, elevating your listening experience to unparalleled
          heights.
        </Description>
        <FeatureList />
      </div>
      <div className="border">
        <ImageBlock />{" "}
      </div>
    </section>
  );
}
