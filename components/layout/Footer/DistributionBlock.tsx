import React from 'react';
import Form from './Form';

const DistributionBlock = () => {
  return (
    <div className="mx-4 mt-3 mb-8 flex flex-col items-start justify-between rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-8 md:mx-16 md:flex-row md:items-center">
      <div className="flex-1">
        <h2 className="mb-4 max-w-64 text-3xl font-bold text-white">Ready to Get Our New Stuff?</h2>
        <Form />
      </div>
      <div className="mt-6 max-w-xs md:mt-0 md:ml-8">
        <span className="mb-2 block font-semibold text-white">Gossamer for Homes and Needs</span>
        <span className="block text-sm text-zinc-200">
          We will listen to your needs, identify the best approach, and then create a bespoke smart
          EV charging solution that is right for you.
        </span>
      </div>
    </div>
  );
};

export default DistributionBlock;
