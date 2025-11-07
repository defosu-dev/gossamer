import React from "react";
import * as Icons from "lucide-react";

export type FeatureItemProps = {
  icon: string;
  text: string;
};

const FeatureItem = ({ icon, text }: FeatureItemProps) => {
  const LucideIcon = (Icons as unknown as Record<string, React.ElementType>)[
    icon
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {LucideIcon && <LucideIcon className="size-5 text-gray-700" />}
        <span className="text-sm text-gray-600">{text}</span>
      </div>
    </div>
  );
};

export default FeatureItem;
