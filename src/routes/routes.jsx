import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
