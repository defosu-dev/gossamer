import React from 'react';
import FeatureItem, { FeatureItemProps } from './FeatureItem';

type FeatureListProps = {
  items: FeatureItemProps[];
};

const FeatureList = ({ items }: FeatureListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {items.map((feature, idx) => (
        <FeatureItem key={idx} icon={feature.icon} text={feature.text} />
      ))}
    </div>
  );
};

export default FeatureList;
