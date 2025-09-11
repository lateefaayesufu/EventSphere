import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Faqs from "./pages/FAQs";

import { ReactLenis } from "lenis/react";

const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  { path: "events", element: <Events /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "Gallery", element: <Gallery /> },
  { path: "faq", element: <Faqs /> },
]);

const App = function () {
  return (
    <ReactLenis root>
      <RouterProvider router={router} />
    </ReactLenis>
  );
};

export default App;
