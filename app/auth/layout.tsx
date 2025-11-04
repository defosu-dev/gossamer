import Container from "@/components/common/Container";
import { ILayout } from "@/types/ILayout";
import React from "react";

const layout = ({ children }: ILayout) => {
  return <Container justifyContent="center" alignItems="center" className="py-10">{children}</Container>;
};

export default layout;
