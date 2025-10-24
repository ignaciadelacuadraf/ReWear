// src/components/TarjetaCategoria/TarjetaCategoria.jsx

import "./TarjetaCategoria.css";
import { Link } from "react-router-dom"; // <<-- ¡NUEVO!

export default function TarjetaCategoria({ to, label, img }) {
  return (
    // Usamos <Link> en lugar de <a>
    <Link to={to} className="tarjeta-categoria">
      <img src={img} alt={label} className="tarjeta-categoria__img" />
      <span className="tarjeta-categoria__label">{label}</span>
    </Link>
  );
}