import React from "react";
import Title from "./NewArrivalTitle";
import Description from "./NewArrivalDescription";
import FeatureList from "./FeatureList";
import ImageBlock from "./ImageBlock";
import { FeatureItemProps } from "./FeatureItem";
import Button from "@/components/common/Button";

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
    <section className="container mx-auto p-1 max-w-7xl flex items-center justify-between gap-8">
      {/* Контент слева */}
      <div className="flex flex-col max-w-lg px-6 mx-auto">
        <span className="text-xs font-semibold text-zinc-600 mb-2">
          {label}
        </span>
        <div className="cursor-pointer">
          <Title>{title}</Title>
        </div>
        <Description>{description}</Description>
        <FeatureList items={features} />
        <div className="flex justify-end">
          <Button variant="primary">Details</Button>
        </div>
      </div>

      {/* Изображение справа */}
      <div className="flex-1 h-[460px]">
        <ImageBlock src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};

export default NewArrival;
