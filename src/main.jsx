import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Createpost from "./components/createPost.jsx";
import Home from "./components/home.jsx";
import Subreddits from "./components/subreddits.jsx";
import SingleSubreddit from "./components/singleSubreddit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/post", element: <Createpost /> },
      { path: "/subreddit/:subredditName", element: <SingleSubreddit /> },
      { path: "/subreddit", element: <Subreddits /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
