import { Link } from "react-router-dom";
import usuariosMock from "../data/usuarios";

export default function Usuarios() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Usuários</h2>
      <ul>
        {usuariosMock.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
      {role === "ADMINISTRADOR" && (
        <Link to="/usuarios/gerenciar" style={{ marginTop: "10px", display: "inline-block" }}>
          Gerenciar usuários
        </Link>
      )}
    </div>
  );
}
