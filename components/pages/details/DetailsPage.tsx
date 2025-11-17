//@ts-nocheck
'use client';
import React from 'react';
import ExploreSection from '../home/sections/explorecurated/ExploreSection';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import OrderBar from './OrderBar';
import InfoBlock from './InfoBlock';
import ProductGallery from './ProductGallery';
import Container from '@/components/common/Container';

const DetailsPage = () => {
  return (
    <Container xCenter className="flex w-full flex-col">
      <SearchBar />
      {/* Секция товаров */}
      <div className="mt-5 flex w-full items-start gap-5 p-1 px-6">
        <div className="max-w-120 border">
          <ProductGallery />
        </div>

        <div className="w-full border">
          <InfoBlock />
        </div>

        <div className="w-full max-w-80 border">
          <OrderBar />
        </div>
      </div>

      {/* Секция Explore */}
      <ExploreSection />
    </Container>
  );
};

export default DetailsPage;
