// src/components/Footer/Footer.jsx (o donde lo tengas)

import "./Footer.css";
import { Link } from "react-router-dom"; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        {/* COLUMNA 1 */}
        <div className="footer__col">
          <h4 className="footer__title">Contacto</h4>
          <ul className="footer__list">
            <li>mail: ventas@rewear.com</li>
            <li>instagram: @rewear_</li>
            <li>celular: +56 9 7374 2974</li>
            {/* El link de "Sobre Nosotras" se ha movido */}
          </ul>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer__col">
          <h4 className="footer__title">Tiendas y horarios</h4>
          <ul className="footer__list">
            <li className="footer__store">
              <strong>Mall Casa Costanera</strong><br />
              <span className="footer__info">
                <em>Nueva Costanera 3900</em><br />
                <em>Lunes a domingo 10:00 a 20:30 hrs.</em>
              </span>
            </li>
            <li className="footer__store">
              <strong>Mall Vivo Los Trapenses</strong><br />
              <span className="footer__info">
                <em>Av. José Alcalde Délano 10492</em><br />
                <em>Lunes a domingo 10:00 a 20:00 hrs.</em>
              </span>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer__col">
          <h4 className="footer__title">Políticas</h4>
          <ul className="footer__list">
            <li><Link to="/policies/refund">Política de reembolso</Link></li>
            <li><Link to="/policies/shipping">Política de envío</Link></li>
          </ul>
        </div>

        {/* ===== COLUMNA 4 (NUEVA) ===== */}
        <div className="footer__col">
          <h4 className="footer__title">Sobre Nosotras</h4>
          <ul className="footer__list">
            <li>
              <Link to="/nosotras">Conoce al equipo</Link>
            </li>
          </ul>
        </div>
        {/* =============================== */}

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} ReWear — Moda circular
      </div>
    </footer>
  );
}