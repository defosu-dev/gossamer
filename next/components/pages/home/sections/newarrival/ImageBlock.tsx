import React from "react";

export default function ImageBlock() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/your-image-path.jpg"
        alt="Marshhall Photo"
        className="object-cover w-[800px] h-[440px]"
      />
    </div>
  );
}
