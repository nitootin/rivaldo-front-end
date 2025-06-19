import { useState } from "react";
import chamadosMock from "../data/chamados";
import { Link } from "react-router-dom";

export default function Chamados() {
  const [chamados, setChamados] = useState(chamadosMock);
  const userRole = localStorage.getItem("role");

  const concluirChamado = (id) => {
    setChamados(chamados.filter((ch) => ch.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chamados em andamento</h2>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id} style={{ marginBottom: "10px" }}>
            <strong>{chamado.titulo}</strong> - {chamado.descricao}
            {userRole === "ADMINISTRADOR" && (
              <button
                onClick={() => concluirChamado(chamado.id)}
                style={{
                  marginLeft: "10px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Concluir
              </button>
            )}
          </li>
        ))}
      </ul>
      <Link to="/criar-chamado">+ Criar novo chamado</Link>
    </div>
  );
}