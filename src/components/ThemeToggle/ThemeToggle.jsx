// src/components/ThemeToggle/ThemeToggle.jsx
import { useTheme } from "../../app/theme/useTheme";
import { Sun, Moon } from "lucide-react"; // Librería de íconos pro
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`theme-switch ${isDark ? "is-dark" : "is-light"}`}
      onClick={toggle}
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      title={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
    >
      <div className="switch-handle">
        {isDark ? <Moon size={18} strokeWidth={2.4} /> : <Sun size={18} strokeWidth={2.4} />}
      </div>
    </button>
  );
}

