import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PiAlignCenterHorizontalLight } from "react-icons/pi";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Popular from "./pages/Popular/Popular.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import CreateCommunity from "./pages/CreateCommunity/CreateCommunity.jsx";
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Post from "./pages/Post/Post.jsx";
import Community from "./pages/Community/Community.jsx"
import Profile from './pages/Profile/Profile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { index: true, element: <Home /> },
      // { index: true, element: <Profile /> },
      // { index: true, element: <Post /> },
      { index: true, element: <Community /> },
      { path: "/popular", element: <Popular /> },
      { path: "/create-post", element: <CreatePost />},
      { path: "create-community", element: <CreateCommunity />},
      { path: "/posts/:id", element: <Post />}
    ],
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
