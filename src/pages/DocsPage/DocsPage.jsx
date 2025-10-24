// src/pages/DocsPage/DocsPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularDonut from "../../components/dynamics/CircularDonut/CircularDonut";
import Accordion from "../../components/dynamics/Accordion/Accordion";
import "./DocsPage.css";

export default function DocsPage() {
  const navigate = useNavigate();

  // CONTENIDO (mantengo tus colores y rutas)
  const steps = useMemo(
    () => [
      {
        key: "signup",
        title: "CREAR CUENTA",
        color: "#33a9ac",
        panelBg: "#eaf6f3",
        cta: { label: "Ir a registro", href: "/registro" },
        details: {
          proposito:
            "Habilitar tu identidad en ReWear para comprar y vender con seguridad.",
          pasos: [
            "En el navbar, haz clic en el ícono de perfil y elige “Registrarse”.",
            "Completa el formulario: nombre, correo y contraseña.",
            "Confirma el correo de verificación para activar tu cuenta.",
            "Buenas prácticas: usa una contraseña fuerte y completa tu perfil con tallas y preferencias.",
          ],
        },
      },
      {
        key: "explore",
        title: "EXPLORAR",
        color: "#ffa646",
        panelBg: "#f0e7dc",
        cta: { label: "Ver categorías", href: "/" },
        details: {
          proposito: "Descubrir productos de forma rápida y precisa.",
          pasos: [
            "Menú del navbar: Mujer, Hombre, Nuevo, Sale.",
            "Buscador central: escribe una categoría, color o marca.",
            "Main Page (clic en el logo): ver categorías y nuevos productos.",
          ],
        },
      },
      {
        key: "buy",
        title: "COMPRAR",
        color: "#f86041",
        panelBg: "#e7d8d5",
        cta: { label: "Ir al carro", href: "/carro" },
        details: {
          proposito: "Finalizar compras de forma clara y segura.",
          pasos: [
            "Abre el detalle del producto.",
            "Presiona “Agregar al carro”.",
            "Ve al carro desde el ícono del navbar y haz clic en “Pagar”.",
          ],
        },
      },
      {
        key: "sell",
        title: "VENDER",
        color: "#902062",
        panelBg: "#d2bcc9",
        cta: { label: "Publicar producto", href: "/mi-cuenta" },
        details: {
          proposito: "Publicar y gestionar tus prendas en venta.",
          pasos: [
            "Crea una cuenta si no tienes.",
            "Desde el ícono de perfil, entra a “Mi cuenta” → “Mis Ventas”.",
            "Haz clic en “Vender un producto”: completa nombre, talla, precio, imágenes y estado.",
            "Gestiona y edita tus publicaciones en “Mis Ventas”.",
          ],
        },
      },
      {
        key: "account",
        title: "MI CUENTA",
        color: "#343779",
        panelBg: "#ceceda",
        cta: { label: "Ir a mi cuenta", href: "/mi-cuenta" },
        details: {
          proposito: "Centralizar tu actividad y datos.",
          pasos: [
            "Mis Ventas: administrar publicaciones.",
            "Mis Compras: historial, estados y evaluaciones.",
            "Mi Perfil: nombre, correo, imagen y preferencias.",
          ],
        },
      },
    ],
    []
  );

  // REFS
  const sectionRefs = useRef([]);
  const railViewportRef = useRef(null);

  // ESTADO ACTIVO
  const [activeIdx, setActiveIdx] = useState(0);

  // OBSERVER: detecta qué tarjeta está visible dentro del rail derecho
  useEffect(() => {
    const rootEl = railViewportRef.current;
    if (!rootEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = [...entries]
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number(visible.target.dataset.index);
          if (!Number.isNaN(idx)) setActiveIdx(idx);
        }
      },
      { root: rootEl, threshold: [0.35, 0.6, 0.85] }
    );

    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // ANTI-SALTITO (delegación): al abrir/cerrar el acordeón, congela el snap un momento
  useEffect(() => {
    const rail = railViewportRef.current;
    if (!rail) return;

    const onTriggerMouseDown = (e) => {
      if (e.target.closest(".acc-trigger")) e.preventDefault(); // evita scroll-into-view por foco
    };

    const onTriggerClick = (e) => {
      const btn = e.target.closest(".acc-trigger");
      if (!btn) return;

      const prevScroll = rail.scrollTop;
      rail.style.scrollSnapType = "none";

      requestAnimationFrame(() => {
        rail.scrollTop = prevScroll;
        setTimeout(() => {
          rail.scrollTop = prevScroll;
          rail.style.scrollSnapType = "y proximity"; // coincide con CSS
        }, 300); // ajusta a la duración de tu animación del Accordion
      });
    };

    rail.addEventListener("mousedown", onTriggerMouseDown, true);
    rail.addEventListener("click", onTriggerClick, true);
    return () => {
      rail.removeEventListener("mousedown", onTriggerMouseDown, true);
      rail.removeEventListener("click", onTriggerClick, true);
    };
  }, []);

  // CLICK EN EL DONUT → scrollea la tarjeta correspondiente (en el rail)
  const handleSelectFromDonut = (idx) => {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ROTACIÓN: centro del segmento activo a posición abajo-derecha (−45°)
  const slice = 360 / steps.length;
  const startDeg = -90 + activeIdx * slice;
  const centerDeg = startDeg + slice / 2;
  const targetDeg = -45;
  const rotationDeg = targetDeg - centerDeg;

  return (
    <main
      className="docs2"
      style={{ "--vp-h": "560px" }}  // ← tu tamaño anterior fijo
    >
      {/* IZQUIERDA (fija) */}
      <aside className="docs2__aside">
        <div className="aside__frame">
          <div className="aside__head">
            <h1 className="brand__title">Guía ReWear</h1>
            <p className="brand__lead">
              Recorre el ciclo de la moda circular. Haz clic en el círculo o desplázate.
            </p>
          </div>

          <div className="aside__viewport" aria-hidden="true">
            <CircularDonut
              steps={steps}
              size={400}               // ← tu tamaño anterior del donut
              initialActive={activeIdx}
              activeIndex={activeIdx}
              rotationDeg={rotationDeg}
              onSelect={handleSelectFromDonut}
            />
          </div>
        </div>
      </aside>

      {/* DERECHA (scrollable + snap) */}
      <div className="docs2__railViewport" ref={railViewportRef}>
        <section className="docs2__rail" aria-label="Secciones de ayuda">
          {steps.map((step, i) => {
            const items = [
              {
                id: `ver-mas-${step.key}`,
                title: "Ver más",
                content: (
                  <div className="sec__body">
                    <p><strong>Propósito:</strong> {step.details.proposito}</p>
                    <p><strong>Cómo interactuar:</strong></p>
                    <ol className="sec__ol">
                      {step.details.pasos.map((t, k) => <li key={k}>{t}</li>)}
                    </ol>
                  </div>
                ),
              },
            ];

            return (
              <article
                key={step.key}
                className="sec"
                data-index={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                style={{ "--accent": step.color, "--panel": step.panelBg }}
              >
                <header className="sec__head">
                  <span className="sec__chip" aria-hidden />
                  <h2 className="sec__title">{step.title}</h2>
                  <p className="sec__lead">{step.details.proposito}</p>
                </header>

                <div className="sec__card">
                  <Accordion
                    items={items}
                    style={{ "--accent": step.color, "--panel": step.panelBg }}
                  />

                  <div className="sec__cta">
                    <h3>Ir a esta parte</h3>
                    <button
                      type="button"
                      className="sec__btn"
                      onClick={() => navigate(step.cta.href)}
                    >
                      {step.cta.label}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
