import React, { useMemo, useState, useEffect } from "react";
import "./CircularDonut.css";

const deg2rad = (deg) => (Math.PI * deg) / 180;
const polar = (cx, cy, r, angleDeg) => {
  const a = deg2rad(angleDeg);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};
function ringPath(cx, cy, rO, rI, start, end) {
  const large = end - start <= 180 ? 0 : 1;
  const p1 = polar(cx, cy, rO, start);
  const p2 = polar(cx, cy, rO, end);
  const p3 = polar(cx, cy, rI, end);
  const p4 = polar(cx, cy, rI, start);
  return `M ${p1.x} ${p1.y} A ${rO} ${rO} 0 ${large} 1 ${p2.x} ${p2.y}
          L ${p3.x} ${p3.y} A ${rI} ${rI} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

/**
 * Props:
 * - steps: [{ key, title, color }]
 * - size?: number
 * - initialActive?: number|null
 * - activeIndex?: number        // controlado desde afuera (scroll sync)
 * - rotationDeg?: number        // rota solo los segmentos (no el texto centro)
 * - onSelect?: (idx:number) => void
 */
export default function CircularDonut({
  steps = [],
  size = 400,
  initialActive = 0,
  activeIndex,
  rotationDeg = 0,
  onSelect,
}) {
  const [internalActive, setInternalActive] = useState(initialActive);
  const active = typeof activeIndex === "number" ? activeIndex : internalActive;
  const [hover, setHover] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cx = size / 2, cy = size / 2;
  const rOuter = size * 0.46;
  const rInner = size * 0.28;
  const sliceGap = 2;

  const segments = useMemo(() => {
    if (!steps.length) return [];
    const slice = 360 / steps.length;
    return steps.map((s, i) => {
      const start = -90 + i * slice;
      const end = start + slice - sliceGap;
      const endLine = start + slice;
      return {
        ...s, idx: i,
        start, end,
        d: ringPath(cx, cy, rOuter, rInner, start, end),
        dLine: ringPath(cx, cy, rOuter, rInner, end, endLine),
      };
    });
  }, [steps, size]);

  const center = hover != null ? steps[hover] : steps[active];

  const handleClickSeg = (idx) => {
    setInternalActive(idx);
    onSelect?.(idx);
  };

  return (
    <div className={`donut-root ${mounted ? "is-mounted" : ""}`}>
      <div className="donut-wrap" style={{ width: size, height: size }}>
        <svg
          className="donut-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="group"
          aria-label="Ciclo ReWear"
        >
          {/* Solo los segmentos rotan con el índice activo */}
          <g transform={`rotate(${rotationDeg} ${cx} ${cy})`}>
            {segments.map((seg) => {
              const isActive = active === seg.idx;
              return (
                <g
                  key={seg.key ?? seg.idx}
                  className={`seg ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setHover(seg.idx)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleClickSeg(seg.idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={seg.title}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && handleClickSeg(seg.idx)
                  }
                >
                  <path d={seg.d} fill={seg.color || "#999"} className="donut-seg">
                    <title>{seg.title}</title>
                  </path>
                  <path d={seg.dLine} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="2" />
                </g>
              );
            })}
          </g>

          {/* Centro: no rota, solo muestra título del hover/activo */}
          <circle
            cx={cx}
            cy={cy}
            r={rInner - 8}
            className="donut-center"
            fill="var(--card, #fff)"
            stroke="var(--border, #e5e7eb)"
          />
          {(hover != null || typeof active === "number") && (
            <text
              x={cx}
              y={cy}
              className="donut-title"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fill: center?.color || "var(--ink, #111)" }}
              aria-live="polite"
            >
              {center?.title || ""}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
