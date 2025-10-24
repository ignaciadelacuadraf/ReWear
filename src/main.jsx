// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./app/auth/AuthContext";

// importa estilos globales AQUÍ (se cargan 1 sola vez)
import "./styles/theme.css";   // tokens + base
import "./index.css";          // lo que ya tengas global

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
