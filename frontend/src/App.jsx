import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "events", element: <Events /> },
  { path: "Gallery", element: <Gallery /> },
]);

const App = function () {
  return <RouterProvider router={router} />;
};

export default App;
