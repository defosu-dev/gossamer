import React, { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

const NewArrivalTitle = ({ children }: TitleProps) => {
  return <h1 className="text-5xl font-bold mb-4">{children}</h1>;
};

export default NewArrivalTitle;
