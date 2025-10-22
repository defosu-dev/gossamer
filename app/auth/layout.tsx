import { ILayout } from "@/types/ILayout";
import React from "react";

const layout = ({ children }: ILayout) => {
  return <div>{children}</div>;
};

export default layout;
