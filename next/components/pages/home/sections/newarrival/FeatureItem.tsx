import React from "react";
import { ReactNode } from "react";

type FeatureItemProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

const FeatureItem = ({ icon, title, text }: FeatureItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-gray-100 rounded-full p-4">{icon}</div>
      <div>
        <h3 className="font-semibold text-xl mb-1">{title}</h3>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
