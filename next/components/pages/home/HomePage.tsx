import React from "react";
import NewArrival from "./sections/newarrival/NewArrival";
import ProductCard from "@/components/common/blocks/ProductCard/ProductCard";

const mockProductData = [
  {
    id: "1",
    name: "Эргономичная подставка для телефона",
    imageSrc:
      "https://images.unsplash.com/photo-1620248232876-b631f414e27f?q=80&w=1974&auto=format&fit=crop",
    imageAlt: "Черная металлическая подставка для телефона",
    category: "Аксессуары",
    rating: 4.8,
    reviewCount: 1200,
    price: 29.9,
  },
  {
    id: "2",
    name: "Беспроводные наушники Pro X",
    imageSrc:
      "https://images.unsplash.com/photo-1546435770-a3e433b4fa90?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Беспроводные наушники белого цвета",
    category: "Электроника",
    rating: 5.0,
    reviewCount: 850,
    price: 199.99,
  },
  {
    id: "3",
    name: "Умные часы FitPulse",
    imageSrc:
      "https://images.unsplash.com/photo-1579586337278-fca1d56788d1?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Умные часы на руке",
    category: "Гаджеты",
    rating: 4.5,
    reviewCount: 230,
    price: 125.5,
  },
  {
    id: "4",
    name: "Портативная колонка Soundwave",
    imageSrc:
      "https://images.unsplash.com/photo-1550993952-094d1253c072?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Колонка Soundwave",
    category: "Аудио",
    rating: 4.2,
    reviewCount: 45,
    price: 75.0,
  },
  {
    id: "5",
    name: "Зарядное устройство PowerFlow",
    imageSrc:
      "https://images.unsplash.com/photo-1627885474341-3d71249b6574?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Зарядное устройство для телефона",
    category: "Аксессуары",
    rating: 4.9,
    reviewCount: 560,
    price: 35.75,
  },
];

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Наши товары</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProductData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <div className="border">
        <NewArrival />
      </div>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </div>
  );
};

export default HomePage;
