import "./Footer.css";

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
            <li><a href="/policies/refund">Política de reembolso</a></li>
            <li><a href="/policies/shipping">Política de envío</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} ReWear — Moda circular
      </div>
    </footer>
  );
}
