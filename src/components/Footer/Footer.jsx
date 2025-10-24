import "./Footer.css";
import { Link } from "react-router-dom"; // <-- LÍNEA NUEVA (importar Link)

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
            
            {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
            <li>
              <Link to="/nosotras">Sobre Nosotras</Link>
            </li>
            {/* ---------------------------- */}

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
            {/*
              NOTA: He cambiado los <a href> por <Link to> 
              para que la navegación sea interna de React y no recargue la página. 
              Asegúrate de que estas rutas existan en tu router.jsx
            */}
            <li><Link to="/policies/refund">Política de reembolso</Link></li>
            <li><Link to="/policies/shipping">Política de envío</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} ReWear — Moda circular
      </div>
    </footer>
  );
}