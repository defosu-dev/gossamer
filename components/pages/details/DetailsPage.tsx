"use client";
import React from "react";
import ExploreSection from "../home/sections/explorecurated/ExploreSection";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import OrderBar from "./OrderBar";

const DetailsPage = () => {
  return (
    <div className="flex flex-col gap-10 pb-16">
      <SearchBar />
      {/* Секция товаров */}
      <div className="container p-1 px-6">
        <div className="max-w-80 gap-6 border">
          <OrderBar />
        </div>
      </div>

      {/* Секция Explore */}
      <ExploreSection />
    </div>
  );
};

export default DetailsPage;
