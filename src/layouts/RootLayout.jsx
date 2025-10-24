// src/layouts/RootLayout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// --- 1. IMPORTA EL NUEVO COMPONENTE ---
// (Asegúrate que la ruta a tu archivo sea correcta. 
// Te recomiendo crearlo en 'src/utils/ScrollToTop.jsx')
import ScrollToTop from '../utils/ScrollToTop';

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}