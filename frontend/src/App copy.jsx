// App.jsx
import React, { useState } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import { ReactLenis } from "lenis/react";

// Import all your page components
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Faqs from "./pages/FAQs";
import Login from "./pages/Login"; // This is your Auth component
import AdminDashboard from "./admin/Dashboard";
import AdminHome from "./admin/pages/Home";

// Create a component to manage authentication state and provide it to nested routes
const AppLayout = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	// You can pass the state and setter functions via props or context
	// For this example, we'll use a simple prop drilling approach
	const authProps = {
		isLoggedIn,
		setIsLoggedIn,
		isAdminLoggedIn,
		setIsAdminLoggedIn,
	};

	return (
		<ReactLenis root>
			{/* You would place a Navbar component here that uses isLoggedIn/isAdminLoggedIn to show different links */}
			<Outlet context={authProps} />
		</ReactLenis>
	);
};

// Define a protected route component
const ProtectedRoute = ({ children, isAllowed, redirectTo = "/" }) => {
	if (!isAllowed) {
		return <Navigate to={redirectTo} replace />;
	}
	return children;
};

// Define the routes for your application
const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{ path: "events", element: <Events /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "gallery", element: <Gallery /> },
			{ path: "faq", element: <Faqs /> },

			// Public login routes
			{ path: "login", element: <Login /> },

			{
				path: "admin",
				element: <AdminDashboard />,
				children: [
					{ path: "", element: <Navigate to="home" />, index: true },
					{ path: "home", element: <AdminHome /> },
					{ path: "events" },
					{ path: "users" },
					{ path: "settings" },
				],
			},
		],
	},
]);

const App = function () {
	return <RouterProvider router={router} />;
};

export default App;
