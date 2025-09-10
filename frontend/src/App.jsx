import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Events from "./pages/Events";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "/events", element: <Events /> },
]);

const App = function () {
  return <RouterProvider router={router} />;
};

export default App;
