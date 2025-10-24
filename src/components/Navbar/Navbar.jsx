// src/components/Navbar/Navbar.jsx
import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/auth/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [q, setQ] = useState("");

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // 👤 Auth
  const { user, logout } = useAuth();

  // IDs únicos para aria-controls
  const menuId = useId();
  const profileId = useId();

  // 🔒 Cerrar menús al hacer click fuera o presionar Escape
  useEffect(() => {
    const onClickOutside = (e) => {
      const insideMenu =
        e.target.closest?.(".rw-menu-panel") || e.target.closest?.(".rw-menu-btn");
      const insideProfile =
        e.target.closest?.(".rw-profile-panel") || e.target.closest?.(".rw-icon-ghost");

      if (!insideMenu) setMenuOpen(false);
      if (!insideProfile) setProfileOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // 🔍 Buscar productos
  function handleSearch(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate(`/products?q=${encodeURIComponent(term)}`);
    setMenuOpen(false);
    setProfileOpen(false);
  }

  // ✅ Navegación manual robusta (asegura cierre del menú)
  function go(path, e) {
    e?.preventDefault();
    navigate(path);
    setMenuOpen(false);
    setProfileOpen(false);
  }

  // 🛒 Carrito con verificación de sesión
  function handleCartClick() {
    setMenuOpen(false);
    setProfileOpen(false);

    if (user) {
      navigate("/carro"); // logueado → carro
    } else {
      // no logueado → login y luego volver al carro
      navigate("/iniciar-sesion", { state: { redirectTo: "/carro" } });
    }
  }

  return (
    <header className="rw-navbar rw-font">
      <div className="rw-nav-wrap">
        {/* IZQUIERDA: LOGO + MENÚ */}
        <div className="rw-left" ref={menuRef}>
          <Link
            className="rw-brand"
            to="/"
            aria-label="Ir a inicio"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/logo_blanco.png" alt="ReWear" className="rw-brand__logo" />
          </Link>

          <button
            className="rw-menu-btn"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-controls={menuId}
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <img src="/menu.png" alt="" aria-hidden="true" />
            <span className="rw-menu-label">MENÚ</span>
          </button>

          <div
            id={menuId}
            className={`rw-menu-panel ${menuOpen ? "is-open" : ""}`}
            role="menu"
          >
            <Link role="menuitem" to="/new" className="rw-menu-item" onClick={(e) => go("/new", e)}>
              New
            </Link>

            {/* Submenú Mujer */}
            <details className="rw-submenu">
              <summary className="rw-submenu__summary">Mujer</summary>
              <div className="rw-submenu-list">
                <Link to="/womens/tops" onClick={(e) => go("/womens/tops", e)}>Tops</Link>
                <Link to="/womens/bottoms" onClick={(e) => go("/womens/bottoms", e)}>Bottoms</Link>
                <Link to="/womens/shoes" onClick={(e) => go("/womens/shoes", e)}>Zapatos</Link>
                <Link to="/womens/accessories" onClick={(e) => go("/womens/accessories", e)}>Accesorios</Link>
              </div>
            </details>

            {/* Submenú Hombre */}
            <details className="rw-submenu">
              <summary className="rw-submenu__summary">Hombre</summary>
              <div className="rw-submenu-list">
                <Link to="/mens/tops" onClick={(e) => go("/mens/tops", e)}>Tops</Link>
                <Link to="/mens/bottoms" onClick={(e) => go("/mens/bottoms", e)}>Bottoms</Link>
                <Link to="/mens/shoes" onClick={(e) => go("/mens/shoes", e)}>Zapatos</Link>
                <Link to="/mens/accessories" onClick={(e) => go("/mens/accessories", e)}>Accesorios</Link>
              </div>
            </details>

            <Link role="menuitem" to="/sale" className="rw-menu-item" onClick={(e) => go("/sale", e)}>
              Sale
            </Link>
          </div>
        </div>

        {/* CENTRO: BUSCADOR */}
        <form className="rw-center rw-search" role="search" onSubmit={handleSearch}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="¿Qué estás buscando?"
            aria-label="Buscar productos"
          />
          <button type="submit" className="rw-search-btn" title="Buscar" aria-label="Buscar">
            <img src="/busqueda.png" alt="" aria-hidden="true" />
          </button>
        </form>

        {/* DERECHA: INSTRUCCIONES + PERFIL + CARRITO + TEMA */}
        <nav className="rw-right rw-actions" aria-label="Acciones">
          <button
            className="rw-icon-ghost rw-icon-lg"
            title="Instrucciones"
            type="button"
            onClick={() => go("/docs")}
          >
            <img src="/guide.png" alt="" aria-hidden="true" />
            <span className="rw-sr-only">Instrucciones</span>
          </button>

          {/* PERFIL */}
          <div className="rw-profile-root" ref={profileRef}>
            <button
              className="rw-icon-ghost rw-icon-lg"
              title="Perfil"
              type="button"
              aria-haspopup="true"
              aria-expanded={profileOpen}
              aria-controls={profileId}
              onClick={() => setProfileOpen((v) => !v)}
            >
              <img src="/perfil.png" alt="" aria-hidden="true" />
              <span className="rw-sr-only">Perfil</span>
            </button>

            <div
              id={profileId}
              className={`rw-profile-panel ${profileOpen ? "is-open" : ""}`}
              role="menu"
            >
              {!user && (
                <>
                  <Link role="menuitem" to="/iniciar-sesion" onClick={(e) => go("/iniciar-sesion", e)}>
                    Inicia Sesión
                  </Link>
                  <Link role="menuitem" to="/registro" onClick={(e) => go("/registro", e)}>
                    Regístrate
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link role="menuitem" to="/mi-cuenta" onClick={(e) => go("/mi-cuenta", e)}>
                    Mi cuenta
                  </Link>
                  <button
                    role="menuitem"
                    className="rw-menu-item"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>

          {/* CARRITO (redirige según login) */}
          <button
            className="rw-icon-ghost rw-icon-lg"
            title="Carrito"
            type="button"
            onClick={handleCartClick}
          >
            <img src="/carro.png" alt="" aria-hidden="true" />
            <span className="rw-sr-only">Carrito</span>
          </button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
