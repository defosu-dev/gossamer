import React, { ReactNode } from "react";

type DescriptionProps = {
  children: ReactNode;
};

const NewArrivalDescription = ({ children }: DescriptionProps) => {
  return <p className="text-gray-500 leading-relaxed mb-8">{children}</p>;
};

export default NewArrivalDescription;
