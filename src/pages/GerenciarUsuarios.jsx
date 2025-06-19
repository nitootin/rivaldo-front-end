import { useState } from "react";
import usuariosMock from "../data/usuarios";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const adicionarUsuario = (e) => {
    e.preventDefault();
    const novo = {
      id: Date.now(),
      nome,
      email
    };
    setUsuarios([...usuarios, novo]);
    setNome("");
    setEmail("");
  };

  const removerUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gerenciar Usuários</h2>
      <form onSubmit={adicionarUsuario} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Adicionar</button>
      </form>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
            <button
              onClick={() => removerUsuario(usuario.id)}
              style={{ marginLeft: "10px", color: "white", background: "red", border: "none" }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}