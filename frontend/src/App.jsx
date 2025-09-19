import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

import ScrollToTop from "./components/sections/ScrollToTop";
import { useState } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { useLenis } from "lenis/react";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Faqs from "./pages/FAQs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms"
// Admin pages

import AdminDashboard from "./admin/pages/Dashboard";
import AdminAuth from "./admin/pages/AdminAuth";
// import EventsAdmin from "./admin/pages/EventsComponents";
import UsersAdmin from "./admin/pages/Users";
import ReportsAdmin from "./admin/pages/Reports";
import SettingsAdmin from "./admin/pages/Settings";

import ParticipantDashboard from "./participant/dashboard/ParticipantDashboard";
import OrganizerDashboard from "./organizers/dashboard/OrganizerDashboard";



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
		<ScrollToTop/>
			<Outlet context={authProps} />
		</ReactLenis>
	);
};

const AdminLayout = () => {
	const lenis = useLenis();

	useEffect(() => {
		if (lenis) {
			lenis.destroy();
		}
	}, [lenis]);
	return (
		<div className="admin-layout">
	
			<Outlet /> 
		</div>
	);
};

const ParticipationLayout = () => {
	const lenis = useLenis();

	useEffect(() => {
		if (lenis) {
			lenis.destroy();
		}
	}, [lenis]);

	return (
		<div className="participation-layout">
			
			<Outlet />
		</div>
	);
};
const OrganizerLayout = () => {
	const lenis = useLenis();

	useEffect(() => {
		if (lenis) {
			lenis.destroy();
		}
	}, [lenis]);
	return (
		<div className="organizer-layout">
		
			<Outlet />
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
			{path: "sitemap", element: <Sitemap/>},
			{path: "terms", element: <Terms/>},
			{path: "privacy", element: <Privacy/>},

			// Admin routes
			{
				path: "admin",
				element: <AdminLayout />,
				children: [
					{ index: true, element: <Navigate to="dashboard" replace /> }, // default

					{ path: "dashboard", element: <AdminDashboard /> },
					{ path: "auth", element: <AdminAuth /> },
					// { path: "events", element: <EventsAdmin /> },
					{ path: "users", element: <UsersAdmin /> },
					{ path: "reports", element: <ReportsAdmin /> },
					{ path: "settings", element: <SettingsAdmin /> },
				],
			},
			{
				path: "participant",
				element: <ParticipationLayout />,
				children: [
					{ index: true, element: <Navigate to="dashboard" replace /> }, // default

					{ path: "dashboard", element: <ParticipantDashboard /> },
				],
			},

			{
				path: "organizer",
				element: <OrganizerLayout />,
				children: [
					{ index: true, element: <Navigate to="dashboard" replace /> }, // default

					{ path: "dashboard", element: <OrganizerDashboard /> },
				],
			},
			{ path: "*", element: <NotFound /> },
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
