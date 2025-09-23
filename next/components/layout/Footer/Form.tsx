import Button from "@/components/common/Button";
import React from "react";

const Form = () => {
  return (
    <div className="bg-white rounded-2xl max-w-75 ">
      <form className="flex items-center gap-1">
        <input
          type="email"
          placeholder="Your Email"
          className="rounded-full px-4 py-2 text-black"
        />
        <Button variant="primary">Send</Button>
      </form>
    </div>
  );
};

export default Form;
