import { IContainer } from "./types";
import React from "react";

const Container = ({ children }: IContainer) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
