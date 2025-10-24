import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/auth/AuthContext";
import "./Login.css"; // reutilizamos los estilos del login

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Register() {
  const { login, user } = useAuth();
  const nav = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    pass: false,
    pass2: false,
  });

  // si ya está logueado, redirige
  useEffect(() => {
    if (user) nav("/mi-cuenta", { replace: true });
  }, [user, nav]);

  const errors = useMemo(
    () => ({
      nombre:
        nombre && nombre.trim().length < 2 ? "El nombre debe tener al menos 2 caracteres." : "",
      email:
        email && !EMAIL_RE.test(email) ? "Correo inválido." : "",
      pass:
        pass && pass.length < 6 ? "La contraseña debe tener mínimo 6 caracteres." : "",
      pass2:
        pass2 && pass2 !== pass ? "Las contraseñas no coinciden." : "",
    }),
    [nombre, email, pass, pass2]
  );

  const isValid =
    nombre.trim().length >= 2 &&
    EMAIL_RE.test(email) &&
    pass.length >= 6 &&
    pass2 === pass;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ nombre: true, email: true, pass: true, pass2: true });
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      // Aquí iría tu request real de registro; por ahora simulamos y dejamos logeado
      login({ nombre: nombre.trim(), email: email.trim(), rol: "explorador" });
      nav("/mi-cuenta", { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card" role="region" aria-labelledby="register-title">
        <h1 id="register-title" className="auth-title">Crea tu cuenta</h1>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="auth-field">
            <label htmlFor="nombre" className="auth-label">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              className={`auth-input ${touched.nombre && errors.nombre ? "is-invalid" : ""}`}
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e)=>setNombre(e.target.value)}
              onBlur={()=>setTouched(t=>({...t, nombre:true}))}
              required
              aria-invalid={touched.nombre && !!errors.nombre}
              aria-describedby={touched.nombre && errors.nombre ? "err-nombre" : undefined}
            />
            {touched.nombre && errors.nombre && (
              <p id="err-nombre" className="auth-error">{errors.nombre}</p>
            )}
          </div>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="email" className="auth-label">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`auth-input ${touched.email && errors.email ? "is-invalid" : ""}`}
              placeholder="tucorreo@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              onBlur={()=>setTouched(t=>({...t, email:true}))}
              autoComplete="email"
              required
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "err-email" : undefined}
            />
            {touched.email && errors.email && (
              <p id="err-email" className="auth-error">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="auth-field">
            <label htmlFor="password" className="auth-label">Contraseña</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                className={`auth-input ${touched.pass && errors.pass ? "is-invalid" : ""}`}
                placeholder="Mínimo 6 caracteres"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                onBlur={()=>setTouched(t=>({...t, pass:true}))}
                required
                autoComplete="new-password"
                aria-invalid={touched.pass && !!errors.pass}
                aria-describedby={touched.pass && errors.pass ? "err-pass" : undefined}
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={()=>setShow(v=>!v)}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {show ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {touched.pass && errors.pass && (
              <p id="err-pass" className="auth-error">{errors.pass}</p>
            )}
          </div>

          {/* Confirmación de contraseña */}
          <div className="auth-field">
            <label htmlFor="password2" className="auth-label">Confirmar contraseña</label>
            <div className="password-field">
              <input
                id="password2"
                name="password2"
                type={show2 ? "text" : "password"}
                className={`auth-input ${touched.pass2 && errors.pass2 ? "is-invalid" : ""}`}
                placeholder="Repite tu contraseña"
                value={pass2}
                onChange={(e)=>setPass2(e.target.value)}
                onBlur={()=>setTouched(t=>({...t, pass2:true}))}
                required
                autoComplete="new-password"
                aria-invalid={touched.pass2 && !!errors.pass2}
                aria-describedby={touched.pass2 && errors.pass2 ? "err-pass2" : undefined}
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={()=>setShow2(v=>!v)}
                aria-label={show2 ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {show2 ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {touched.pass2 && errors.pass2 && (
              <p id="err-pass2" className="auth-error">{errors.pass2}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
            disabled={!isValid || submitting}
            aria-busy={submitting}
          >
            {submitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-bottom">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-link strong">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
