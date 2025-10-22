import { IAuthWrapper } from "./types";
import React from "react";

const AuthWrapper = ({ children }: IAuthWrapper) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AuthWrapper;
