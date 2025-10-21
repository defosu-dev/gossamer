import React from "react";

export const FaqCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="p-6 rounded-xl shadow-sm bg-white">
    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);
