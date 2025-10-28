"use client";
import React from "react";
import ExploreSection from "../home/sections/explorecurated/ExploreSection";
import SearchBar from "@/components/common/SearchBar/SearchBar";

const DetailsPage = () => {
  return (
    // 1. Контейнер с максимальной шириной 7xl, центрированный
    <div className="max-w-7xl mx-auto px-4 items-center py-12">
      <SearchBar />
      <div></div>
      <ExploreSection />
    </div>
  );
};

export default DetailsPage;
