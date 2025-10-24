import "./AboutUs.css"; // El CSS que creamos antes se mantiene igual

export default function AboutUs() {
  return (
    <main className="team-section">
      <div className="container">
        <h2>El equipo detrás de la idea</h2>
        <div className="team-grid">
          {/* Tarjeta de Miembro del Equipo 1 */}
          <div className="team-card">
            {/* --- CAMBIO AQUÍ --- */}
            <img src="/foto_catalina.jpg" alt="Foto de Catalina Infante" />
            <h3>Catalina Infante</h3>
            <p>
              <strong>Co-fundadora.</strong> Su fortaleza es la <strong>visión estratégica</strong>. Tiene la increíble capacidad de conectar ideas y transformar cualquier desafío en un plan de acción claro para el futuro de Rewear.
            </p>
          </div>
          {/* Tarjeta de Miembro del Equipo 2 */}
          <div className="team-card">
            {/* --- CAMBIO AQUÍ --- */}
            <img src="/foto_camila.jpg" alt="Foto de Camila Becerra" />
            <h3>Camila Becerra</h3>
            <p>
              <strong>Co-fundadora.</strong> Su poder es la <strong>obsesión por el detalle</strong>. Está enfocada en el usuario, asegurando que cada pantalla y cada interacción en la app se sientan intuitivas, simples y atractivas.
            </p>
          </div>
          {/* Tarjeta de Miembro del Equipo 3 */}
          <div className="team-card">
            {/* --- CAMBIO AQUÍ --- */}
            <img src="/foto_ignacia.jpg" alt="Foto de Ignacia de la Cuadra" />
            <h3>Ignacia de la Cuadra</h3>
            <p>
              <strong>Co-fundadora.</strong> Su súper poder es la <strong>ejecución técnica</strong>. Es la genia que convierte los diseños y estrategias en una plataforma sólida, funcional y lista para crecer.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}