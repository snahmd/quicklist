import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import ArticleDetail from "./pages/ArticleDetail";
import Messages from "./pages/Messages";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import AddArticle from "./pages/AddArticle";
import ProtectedRoute from "./router/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/article-detail",
        element: <ArticleDetail />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/category/:id",
        element: <CategoryDetail />,
      },
      {
        path: "/messages",
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-article",
        element: (
          <ProtectedRoute>
            <AddArticle />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
