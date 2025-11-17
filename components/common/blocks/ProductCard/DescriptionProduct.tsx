import React from 'react';
import { ReactNode } from 'react';

type DescriptionProps = {
  children: ReactNode;
};

const DescriptionProduct = ({ children }: DescriptionProps) => {
  return <p className="mb-8 leading-relaxed text-gray-500">{children}</p>;
};
export default DescriptionProduct;
