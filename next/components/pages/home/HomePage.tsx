import React from "react";
import NewArrival from "../../common/blocks/NewArrival/NewArrival";
import ProductCard from "@/components/common/blocks/ProductCard/ProductCard";
import { Volume2, BatteryCharging, ThumbsUp } from "lucide-react";

const ProductListData = [
  {
    id: "1",
    name: "Ergonomic Phone Stand",
    imageSrc:
      "https://images.unsplash.com/photo-1620248232876-b631f414e27f?q=80&w=1974&auto=format&fit=crop",
    imageAlt: "Black metal phone stand",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 1200,
    price: 29.9,
  },
  {
    id: "2",
    name: "Wireless Headphones Pro X",
    imageSrc:
      "https://images.unsplash.com/photo-1546435770-a3e433b4fa90?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "White wireless headphones",
    category: "Electronics",
    rating: 5.0,
    reviewCount: 850,
    price: 199.99,
  },
  {
    id: "3",
    name: "Smartwatch FitPulse",
    imageSrc:
      "https://images.unsplash.com/photo-1579586337278-fca1d56788d1?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Smartwatch on wrist",
    category: "Gadgets",
    rating: 4.5,
    reviewCount: 230,
    price: 125.5,
  },
  {
    id: "4",
    name: "Portable Speaker Soundwave",
    imageSrc:
      "https://images.unsplash.com/photo-1550993952-094d1253c072?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Soundwave speaker",
    category: "Audio",
    rating: 4.2,
    reviewCount: 45,
    price: 75.0,
  },
  {
    id: "5",
    name: "PowerFlow Charger",
    imageSrc:
      "https://images.unsplash.com/photo-1627885474341-3d71249b6574?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Phone charger",
    category: "Accessories",
    rating: 4.9,
    reviewCount: 560,
    price: 35.75,
  },

  {
    id: "6",
    name: "Laptop Cooling Pad",
    imageSrc:
      "https://images.unsplash.com/photo-1587825140708-3c8d7fc5b1b7?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Laptop cooling pad with fan",
    category: "Accessories",
    rating: 4.3,
    reviewCount: 310,
    price: 49.99,
  },
  {
    id: "7",
    name: "Noise Cancelling Earbuds",
    imageSrc:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Black noise cancelling earbuds",
    category: "Electronics",
    rating: 4.7,
    reviewCount: 720,
    price: 89.5,
  },
  {
    id: "8",
    name: "Fitness Tracker Band",
    imageSrc:
      "https://images.unsplash.com/photo-1588776814546-ecf165f0b6a0?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Fitness tracker on wrist",
    category: "Gadgets",
    rating: 4.1,
    reviewCount: 150,
    price: 59.99,
  },
  {
    id: "9",
    name: "Bluetooth Portable Speaker",
    imageSrc:
      "https://images.unsplash.com/photo-1598300050285-c3c2b88a8f36?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Compact bluetooth speaker",
    category: "Audio",
    rating: 4.6,
    reviewCount: 200,
    price: 65.0,
  },
  {
    id: "10",
    name: "Fast Wireless Charger",
    imageSrc:
      "https://images.unsplash.com/photo-1612831661463-cd07f84e7f6a?q=80&w=1770&auto=format&fit=crop",
    imageAlt: "Fast wireless charger for phone",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 410,
    price: 39.99,
  },
];

const newArrival = [
  {
    title: "Marshall",
    description:
      "Discover audio excellence with Marshall – a revolutionary speaker merging cutting-edge tech and captivating design.",
    features: [
      {
        icon: <Volume2 size={28} />,
        title: "Super Sound",
        text: "The sound will reach your neighbourhood house",
      },
      {
        icon: <BatteryCharging size={28} />,
        title: "Samson Battery",
        text: "3124124 mAh, can sound you 214 hours",
      },
      {
        icon: <ThumbsUp size={28} />,
        title: "Clean Design",
        text: "With clean design it will be seamless",
      },
    ],
    image: {
      src: "/your-image-path.jpg",
      alt: "Marshall Photo",
    },
  },
];

const HomePage = () => {
  return (
    <div>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      {/*Секция товаров */}
      <div className="container mx-auto p-1 max-w-7xl border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ProductListData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/*Секция товаров */}
      <>
        {newArrival.map((section, idx) => (
          <NewArrival key={idx} {...section} />
        ))}
      </>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </div>
  );
};

export default HomePage;
