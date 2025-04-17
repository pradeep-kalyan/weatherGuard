import React from "react";

const Input = ({ type = "text", placeholder, value, valfxn }) => {
  return (
    <div className="rounded-2xl bg-gray-200 py-2 px-3 w-[400px] border-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300 ease-in-out">
      <input
        type={type}
        value={value}
        onChange={(e) => valfxn(e.target.value)}
        className="p-2 rounded-md bg-transparent text-black placeholder:text-gray-500 outline-none w-full cp text-xl"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
