import Button from '@/components/common/Button';
import React from 'react';

const Form = () => {
  return (
    <div className="flex h-10 w-full items-center overflow-hidden rounded-full border border-neutral-300 bg-white shadow-sm md:w-[360px]">
      <input
        type="text"
        placeholder="Enter your email"
        className="flex-1 px-3 text-sm outline-none"
      />
      <Button variant="primary">Search</Button>
    </div>
  );
};

export default Form;
