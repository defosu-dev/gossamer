import React from "react";
import NewArrival from "./sections/newarrival/NewArrival";
import ProductCard from "@/components/common/blocks/ProductCard/ProductCard";
import ExploreSection from "./sections/explorecurated/ExploreSection";
import { ProductListData } from "../../common/blocks/ProductCard/testproductlistdata";
import { testdatanewarrival } from "./sections/newarrival/testdatanewarrival";

const HomePage = () => {
  return (
    <div>
      {/* Секция товаров */}
      <div className="container mx-auto p-1 max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ProductListData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Секция NewArrival */}
      <NewArrival {...testdatanewarrival} />

      {/* Секция Explore */}
      <ExploreSection />
    </div>
  );
};

export default HomePage;
