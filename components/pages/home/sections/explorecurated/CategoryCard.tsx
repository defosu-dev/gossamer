import React from "react";
import Image from "next/image";

export type Category = {
  label: string;
  image: string;
};

const CategoryCard = ({ image, label }: Category) => {
  return (
    <div className="relative flex-shrink-0 w-120 h-110 rounded-xl overflow-hidden shadow-md group border">
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-3 left-3">
        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
          {label}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
