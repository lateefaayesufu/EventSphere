import React from "react";
import withAuth from "./withAuth";
import { useNavigate } from "react-router";

const Button = ({ children, onClick, requireAuth = false }) => {
	const navigate = useNavigate();
	const ButtonComponent = (
		<button
			type="button"
			onClick={() => navigate("/login")}
			className="bg-white text-black w-fit px-5 py-3 font-semibold rounded-md hover:scale-101 cursor-pointer active:scale-95 transition-transform"
		>
			{children}
		</button>
	);

	const AuthenticatedButton = withAuth(() => ButtonComponent);

	return requireAuth ? <AuthenticatedButton /> : ButtonComponent;
};

export default Button;
