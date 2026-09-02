import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayouts from "./layouts/AuthLayouts";
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import NewsFeed from "./page/NewsFeed/NewsFeed";
import Notification from "./page/Notification/Notification";
import NotFound from "./page/NotFound/NotFound";
import AppProtectRouts from "./components/ProtectRouts/AppProtectRouts";
import AuthProtectRouts from "./components/ProtectRouts/AuthProtectRoute";
import PostDetails from "./page/PostDetails/PostDetails";
import Profile from "./page/Profile/Profile";
import ChangePassword from "./page/ChangePassword/ChangePassword";
import MyPosts from "./page/MyPost/MyPost";

const router = createBrowserRouter([
  {
    path: "/auth", element: <AuthLayouts />, children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <AuthProtectRouts><Login /></AuthProtectRouts> },
      { path: "register", element: <AuthProtectRouts><Register /></AuthProtectRouts> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "", element: <AppProtectRouts><MainLayout /></AppProtectRouts>,
    children: [
      { index: true, element: <Navigate to="newsfeed" replace /> },
      { path: "/newsfeed", element: <NewsFeed /> },
      { path: "/myposts", element: <MyPosts /> },
    ],
  },
  {
    path: "", element: <AppProtectRouts><SimpleLayout /></AppProtectRouts>,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/notifications", element: <Notification /> },
      { path: "/PostDetails/:postId", element: <PostDetails /> },
      { path: "/settings", element: <ChangePassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}