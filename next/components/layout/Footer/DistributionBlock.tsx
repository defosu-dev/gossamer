import React from "react";
import Form from "./Form";

const DistributionBlock = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mx-4 md:mx-16 mt-3">
      <div className="flex-1">
        <h2 className="text-white text-3xl font-bold mb-4 max-w-64">
          Ready to Get Our New Stuff?
        </h2>
        <Form />
      </div>
      <div className="mt-6 md:mt-0 md:ml-8 max-w-xs">
        <span className="block text-white font-semibold mb-2">
          Gossamer for Homes and Needs
        </span>
        <span className="block text-zinc-200 text-sm">
          We will listen to your needs, identify the best approach, and then
          create a bespoke smart EV charging solution that is right for you.
        </span>
      </div>
    </div>
  );
};

export default DistributionBlock;
