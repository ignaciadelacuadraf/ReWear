// src/pages/UserAuth/Login.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/auth/AuthContext";
import "./Login.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  // ✅ Prioridad: redirectTo (enviado por el navbar) → from.pathname → /mi-cuenta
  const from = loc.state?.from?.pathname;
  const redirectTo = loc.state?.redirectTo || from || "/mi-cuenta";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, pass: false });

  // Si ya está logueado, redirige de inmediato a donde corresponda
  useEffect(() => {
    if (user) nav(redirectTo, { replace: true });
  }, [user, nav, redirectTo]);

  const errors = useMemo(
    () => ({
      email: email && !EMAIL_RE.test(email) ? "Correo inválido." : "",
      pass: pass && pass.length < 6 ? "Mínimo 6 caracteres." : "",
    }),
    [email, pass]
  );

  const isValid = EMAIL_RE.test(email) && pass.length >= 6;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, pass: true });
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      // TODO: reemplaza por tu request real
      await login({ email: email.trim(), rol: "explorador" });
      nav(redirectTo, { replace: true });   // ✅ vuelve a donde quería ir (p.ej. /carro)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card" role="region" aria-labelledby="login-title">
        <h1 id="login-title" className="auth-title">Inicia sesión</h1>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
            {touched.email && errors.email && <p id="err-email" className="auth-error">{errors.email}</p>}
          </div>

          {/* Password */}
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
                autoComplete="current-password"
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
            {touched.pass && errors.pass && <p id="err-pass" className="auth-error">{errors.pass}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="auth-submit" disabled={!isValid || submitting} aria-busy={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="auth-bottom">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/registro" className="auth-link strong">Regístrate acá</Link>
        </p>
      </div>
    </main>
  );
}
