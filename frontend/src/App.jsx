import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import { useState } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import { ReactLenis } from "lenis/react";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Faqs from "./pages/FAQs";
import Login from "./pages/Login";

// Admin pages

import AdminDashboard from "./admin/pages/Dashboard";
import AdminAuth from "./admin/pages/AdminAuth";
import EventsAdmin from "./admin/pages/Events";
import UsersAdmin from "./admin/pages/Users";
import ReportsAdmin from "./admin/pages/Reports";
import SettingsAdmin from "./admin/pages/Settings";

const AppLayout = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	const authProps = {
		isLoggedIn,
		setIsLoggedIn,
		isAdminLoggedIn,
		setIsAdminLoggedIn,
	};

	return (
		<ReactLenis root>
			<Outlet context={authProps} />
		</ReactLenis>
	);
};

// Admin layout wrapper (with sidebar/topbar etc.)
const AdminLayout = () => {
	return (
		<div className="admin-layout">
			{/* Add a sidebar or navbar here */}
			<Outlet /> {/* This is where nested admin pages render */}
		</div>
	);
};

// Define routes
const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "events", element: <Events /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "gallery", element: <Gallery /> },
			{ path: "faq", element: <Faqs /> },
			{ path: "login", element: <Login /> },

			// Admin routes
			{
				path: "admin",
				element: <AdminLayout />,
				children: [
					{ index: true, element: <Navigate to="dashboard" replace /> }, // default

					{ path: "dashboard", element: <AdminDashboard /> },
					{ path: "auth", element: <AdminAuth /> },
					{ path: "events", element: <EventsAdmin /> },
					{ path: "users", element: <UsersAdmin /> },
					{ path: "reports", element: <ReportsAdmin /> },
					{ path: "settings", element: <SettingsAdmin /> },
				],
			},
		],
	},
]);

const queryClient = new QueryClient();

const App = () => (
	<AuthProvider>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
		<Toaster />
	</AuthProvider>
);

export default App;
