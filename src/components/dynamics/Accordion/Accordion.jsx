import { useState, useId, useEffect } from "react";
import "./Accordion.css";

/** items: [{ id, title, content: ReactNode }] */
export default function Accordion({ items = [], defaultOpenId = null }) {
  const baseId = useId();
  const [openId, setOpenId] = useState(defaultOpenId);

  useEffect(() => setOpenId(defaultOpenId), [defaultOpenId]);

  return (
    <div className="acc-root" role="region" aria-label="Detalle de la sección">
      {items.map((it, idx) => {
        const isOpen = openId === it.id;
        const headerId = `${baseId}-h-${it.id || idx}`;
        const panelId = `${baseId}-p-${it.id || idx}`;
        return (
          <div className={`acc-item ${isOpen ? "is-open" : ""}`} key={it.id || idx}>
            <button
              className="acc-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={headerId}
              onClick={() => setOpenId(isOpen ? null : it.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenId(isOpen ? null : it.id);
                }
              }}
            >
              <span className="acc-title">{it.title}</span>
              <span className="acc-icon" aria-hidden>{isOpen ? "–" : "+"}</span>
            </button>
            <div
              className="acc-panel"
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
            >
              <div className="acc-panel__inner">
                {typeof it.content === "string" ? <p>{it.content}</p> : it.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
