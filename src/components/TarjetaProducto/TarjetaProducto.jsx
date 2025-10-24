// src/components/TarjetaProducto/TarjetaProducto.jsx
import "./TarjetaProducto.css";
import { Link } from "react-router-dom";

export default function TarjetaProducto({ to, name, price, img }) {
  return (
    <Link to={to} className="tarjeta-producto">
      <img src={img} alt={name} className="tarjeta-producto__img" />
      <div className="tarjeta-producto__body">
        <h3 className="tarjeta-producto__name">{name}</h3>
        <p className="tarjeta-producto__price">{price}</p>
      </div>
    </Link>
  );
}