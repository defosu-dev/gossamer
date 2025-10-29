"use client";
import React from "react";
import ExploreSection from "../home/sections/explorecurated/ExploreSection";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import OrderBar from "./OrderBar";
import InfoBlock from "./InfoBlock";
import ProductGallery from "./ProductGallery";
import Container from "@/components/common/Container";

const DetailsPage = () => {
  return (
    <Container xCenter className="flex flex-col">
      <SearchBar />
      {/* Секция товаров */}
      <div className="p-1 px-6 flex gap-5 items-start w-full">
        <div className="max-w-120 border">
          <ProductGallery />
        </div>

        <div className="w-full border">
          <InfoBlock />
        </div>

        <div className="max-w-80 border w-full">
          <OrderBar />
        </div>
      </div>

      {/* Секция Explore */}
      <ExploreSection />
    </Container>
  );
};

export default DetailsPage;
