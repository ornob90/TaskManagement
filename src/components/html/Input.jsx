import React from "react";

const Input = ({ className, type = "text", ...props }) => {
  return (
    <input
      className={`bg-gray-200 py-2 pl-4 focus:outline-none ${className}`}
      type={type}
      {...props}
    />
  );
};

export default Input;
