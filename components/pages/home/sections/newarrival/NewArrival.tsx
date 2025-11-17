import React from 'react';
import Title from './NewArrivalTitle';
import Description from './NewArrivalDescription';
import FeatureList from './FeatureList';
import ImageBlock from './ImageBlock';
import { FeatureItemProps } from './FeatureItem';
import Button from '@/components/common/Button';

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
  label = 'NEW ARRIVAL',
  title,
  description,
  features,
  image,
}: NewArrivalProps) => {
  return (
    <section className="container mx-auto flex max-w-7xl items-center justify-between gap-8 p-1">
      {/* Контент слева */}
      <div className="mx-auto flex max-w-lg flex-col px-6">
        <span className="mb-2 text-xs font-semibold text-zinc-600">{label}</span>
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
      <div className="h-[460px] flex-1">
        <ImageBlock src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};

export default NewArrival;
