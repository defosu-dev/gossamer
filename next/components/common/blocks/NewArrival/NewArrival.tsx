// NewArrival.tsx
import React from "react";
import Title from "./NewArrivalTitle";
import Description from "./DescriptionNewArrival";
import FeatureList from "./FeatureList";
import ImageBlock from "./ImageBlock";
import { FeatureItemProps } from "./FeatureItem";

type NewArrivalProps = {
  label?: string;
  title: string;
  description: string;
  features: FeatureItemProps[];
  image: {
    src: string;
    alt: string;
  };
};

const NewArrival = ({
  label = "NEW ARRIVAL",
  title,
  description,
  features,
  image,
}: NewArrivalProps) => {
  return (
    <section className="container mx-auto p-1 max-w-7xl border flex items-center justify-between gap-8">
      {/* Контент слева */}
      <div className="flex flex-col max-w-lg">
        <span className="text-xs font-semibold text-zinc-600 mb-2">
          {label}
        </span>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <FeatureList items={features} />
      </div>

      {/* Изображение справа */}
      <div className="flex-1 border">
        <ImageBlock src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};

export default NewArrival;
