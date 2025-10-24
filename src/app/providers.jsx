import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import Account from "../pages/Account";
import Docs from "../pages/Docs";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/account", element: <Account /> },
  { path: "/docs", element: <Docs /> },
]);