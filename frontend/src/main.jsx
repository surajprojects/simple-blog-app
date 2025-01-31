import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx"

import Homepage from "./pages/Homepage/Homepage.jsx";
import Blogs from "./pages/Homepage/Blogs/Blogs.jsx"
import NewBlog from "./pages/Homepage/NewBlog/NewBlog.jsx";
import ShowBlog from "./pages/Homepage/ShowBlog/ShowBlog.jsx";
import EditBlog from "./pages/Homepage/EditBlog/EditBlog.jsx"

import Auth from "./pages/Auth/Auth.jsx";
import Login from "./pages/Auth/Login/Login.jsx"
import Logout from "./pages/Auth/Logout/Logout.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Profile from "./pages/Auth/Profile/Profile.jsx";

import HandleError from "./components/HandleError/HandleError.jsx";

// import "./index.css" // Can be used to add global styles to the whole app, currently unused by Tiger Blog!!!

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/blogs",
    element: <App />,
    children: [
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/blogs/newblog",
        element: <NewBlog />
      },
      {
        path: "/blogs/:blogId",
        element: <ShowBlog />
      },
      {
        path: "/blogs/:blogId/editblog",
        element: <EditBlog />
      },
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/logout",
        element: <Logout />
      },
      {
        path: "/auth/register",
        element: <Register />
      },
      {
        path: "/auth/:userId/profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "*",
    element: <HandleError />
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);