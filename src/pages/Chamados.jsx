import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarChamados, concluirChamado } from '../service/Chamado';

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarChamados() {
      try {
        const data = await listarChamados();
        setChamados(data.filter(c => !c.concluido));
      } catch (error) {
        alert("Erro ao carregar chamados");
      }
    }
    carregarChamados();
  }, []);

  const handleConcluir = async (id) => {
    try {
      await concluirChamado(id);
      setChamados(chamados.filter(c => c.id !== id));
    } catch (error) {
      alert("Erro ao concluir chamado");
    }
  };

  const handleCriarChamado = () => {
    navigate('/chamados/criar');
  };

  return (
    <div style={{ padding: "20px", color: "#1e293b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Lista de Chamados</h2>
        <button
          onClick={handleCriarChamado}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Criar Chamado
        </button>
      </div>

      {chamados.length === 0 ? (
        <p>Nenhum chamado disponível.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {chamados.map((chamado) => (
            <li key={chamado.id} style={{ marginBottom: "20px", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>
              <div>
                <strong>Descrição:</strong> {chamado.descricao} <br />
                <strong>Categoria:</strong> {chamado.categoria} <br />
                <strong>Solicitante:</strong> {chamado.solicitante}
              </div>
              <button
                onClick={() => handleConcluir(chamado.id)}
                style={{
                  marginTop: "8px",
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Concluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
