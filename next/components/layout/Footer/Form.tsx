import React from "react";

const Form = () => {
  return (
    <div className="bg-white rounded-2xl max-w-82 py-0.4">
      <form className="flex items-center gap-1">
        <input
          type="email"
          placeholder="Your Email"
          className="rounded-full px-4 py-2 text-black"
        />
        <button className="bg-zinc-800 text-white rounded-full px-7 py-1 font-semibold hover:bg-zinc-900 transition-colors">
          Send
        </button>
      </form>
    </div>
  );
};

export default Form;
