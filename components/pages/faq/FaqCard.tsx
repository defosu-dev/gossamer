import React from 'react';

export const FaqCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
      {icon}
    </div>
    <h3 className="mb-2 font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);
