import React, { ReactNode } from 'react';

type TitleProps = {
  children: ReactNode;
};

const NewArrivalTitle = ({ children }: TitleProps) => {
  return <h1 className="mb-4 text-5xl font-bold">{children}</h1>;
};

export default NewArrivalTitle;
