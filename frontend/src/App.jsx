import React, { useEffect } from "react";
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

import ParticipantDashboard from "./participant/dashboard/ParticipantDashboard";
import OrganizerDashboard from "./organizers/dashboard/Dashboard";

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

import { useLenis } from "lenis/react";
// Admin layout wrapper (with sidebar/topbar etc.)
const AdminLayout = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.destroy();
    }
  }, [lenis]);
  return (
    <div className="admin-layout">
      {/* Add a sidebar or navbar here */}
      <Outlet /> {/* This is where nested admin pages render */}
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
      {/* Add a sidebar or navbar here */}
      <Outlet /> {/* This is where nested admin pages render */}
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
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
