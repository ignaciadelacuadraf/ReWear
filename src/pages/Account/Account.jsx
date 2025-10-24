// src/pages/Account/Account.jsx
import { useAuth } from "../../app/auth/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  return (
    <main style={{maxWidth:800, margin:"24px auto", padding:"0 24px"}}>
      <h1>Mi cuenta</h1>
      <p>Hola, <strong>{user?.nombre}</strong> ({user?.rol}).</p>
      <button onClick={logout} style={{marginTop:12}}>Cerrar sesión</button>
    </main>
  );
}
