import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="Button"
      className="bg-white text-black w-fit px-5 py-3 font-semibold rounded-md hover:scale-101 cursor-pointer active:scale-95 transition-transform"
    >
      {children}
    </button>
  );
};

export default Button;
