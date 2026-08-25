import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtedtedRoute.jsx";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Popular from "./pages/Popular/Popular.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import CreateCommunity from "./pages/CreateCommunity/CreateCommunity.jsx";
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Post from "./pages/Post/Post.jsx";
import Community from "./pages/Community/Community.jsx"
import Profile from './pages/Profile/Profile.jsx';
import Explore from './pages/Explore/Explore.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      // { index: true, element: <Profile /> }, //testing
      // { index: true, element: <Post /> }, //testing
      // { index: true, element: <Community /> }, //testing
      { path: "/popular", element: <Popular /> },
      { path: "/explore", element: <Explore /> },
      { path: "/posts/:id", element: <Post />},
      { path: '/communities/:id', element: <Community />},
      { path: '/users/:id', element: <Profile /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/create-post", element: <CreatePost /> },
          { path: "/create-community", element: <CreateCommunity /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // </StrictMode>
);
