import React from "react";
import withAuth from "./withAuth";

const Button = ({ children, onClick, requireAuth = false, ...props }) => {
  const ButtonComponent = (
    <button
      type="button"
      onClick={onClick}
      className="bg-white text-black w-fit px-5 py-3 font-semibold rounded-md hover:scale-101 cursor-pointer active:scale-95 transition-transform"
      {...props}
    >
      {children}
    </button>
  );

  const AuthenticatedButton = withAuth((authProps) => (
    <button
      type="button"
      {...props}
      {...authProps}
      className="bg-white text-black w-fit px-5 py-3 font-semibold rounded-md hover:scale-101 cursor-pointer active:scale-95 transition-transform"
    >
      {children}
    </button>
  ));

  return requireAuth ? <AuthenticatedButton onClick={onClick} /> : ButtonComponent;
};

export default Button;
