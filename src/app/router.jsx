// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout    from "../layouts/RootLayout";
import Home          from "../pages/Home/Home";
import CategoryPage  from "../pages/Category/Category";
import SearchResults from "../pages/Search/Search";

import Login    from "../pages/UserAuth/Login.jsx";
import Register from "../pages/UserAuth/Register.jsx";

import DocsPage from "../pages/DocsPage/DocsPage";

// NUEVOS
import Carro     from "../pages/Carro/Carro";
import MiCuenta  from "../pages/MiCuenta/MiCuenta";

import ProtectedRoute from "./auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/docs", element: <DocsPage /> },
      { path: "/products", element: <SearchResults /> },
      { path: "/:gender/:category", element: <CategoryPage /> },

      { path: "/iniciar-sesion", element: <Login /> },
      { path: "/registro", element: <Register /> },

      // Carro (público)
      { path: "/carro", element: <Carro /> },

      // Mi Cuenta (protegido)
      {
        element: <ProtectedRoute />,
        children: [{ path: "/mi-cuenta", element: <MiCuenta /> }],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
