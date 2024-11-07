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
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/category/:id",
        element: <CategoryDetail />,
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
