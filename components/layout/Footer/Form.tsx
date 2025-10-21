import Button from "@/components/common/Button";
import React from "react";

const Form = () => {
  return (
    <div className="flex items-center w-full md:w-[360px] h-12 rounded-full border border-neutral-300 shadow-sm overflow-hidden bg-white">
      <input
        type="text"
        placeholder="Enter your email"
        className="flex-1 px-3 outline-none text-sm "
      />
      <Button variant="primary">Search</Button>
    </div>
  );
};

export default Form;
