import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarChamado() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chamado criado:", { titulo, descricao });
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Novo Chamado</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          rows={4}
          style={{ marginTop: "10px" }}
        />
        <button type="submit" style={{ marginTop: "10px", background: "#2563eb", color: "white" }}>
          Criar Chamado
        </button>
      </form>
    </div>
  );
}