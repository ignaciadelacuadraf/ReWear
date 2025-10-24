import { useEffect, useRef, useState } from "react";
import Accordion from "../Accordion/Accordion";
import "./DetailsCard.css";

/**
 * step: {
 *   title, color, panelBg,
 *   cta: { label, href },
 *   details: { proposito: string, pasos: string[] }
 * }
 */
export default function DetailsCard({ step }) {
  const [open, setOpen] = useState(false); // acordeón "Ver más"
  const titleRef = useRef(null);

  // Cuando cambia de etapa, cierra acordeón y enfoca título
  useEffect(() => {
    setOpen(false);
    if (step && titleRef.current) titleRef.current.focus();
  }, [step]);

  if (!step) return null;

  const items = [
    {
      id: "ver-mas",
      title: "Ver más",
      content: (
        <div className="dc-body">
          <p><strong>Propósito:</strong> {step.details.proposito}</p>
          {step.details.pasos?.length > 0 && (
            <>
              <p><strong>Cómo interactuar:</strong></p>
              <ol className="dc-ol">
                {step.details.pasos.map((t, i) => <li key={i}>{t}</li>)}
              </ol>
            </>
          )}
        </div>
      ),
    },
  ];

return (
  <article
    className="dc-card"
    style={{
      "--accent": step.color || "#0ea5a3",   // color clave del paso
      "--panel": step.panelBg || "#eef8f7",  // fondo suave del paso
    }}
  >
    <h2 className="dc-title" tabIndex={-1} ref={titleRef}>
      {step.title}
    </h2>

    <Accordion
      items={items}
      defaultOpenId={open ? "ver-mas" : null}
      /* 👇 pasa las mismas vars al acordeón */
      style={{ "--accent": `var(--accent)`, "--panel": `var(--panel)` }}
    />

    <div className="dc-action">
      <h3 className="dc-action__title">Ir a esta parte</h3>
      {step.cta && (
        <a className="dc-cta" href={step.cta.href}>
          {step.cta.label}
        </a>
      )}
    </div>
  </article>
);
}
