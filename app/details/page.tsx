import Container from "@/components/common/Container";
import DetailsPage from "@/components/pages/details/DetailsPage";
import { cn } from "@/utils/cn";
import React from "react";

const Page = () => {
  return (
    <div className={cn("w-full")}>
      <DetailsPage />
    </div>
  );
};

export default Page;
