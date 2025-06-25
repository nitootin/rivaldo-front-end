
import React, { useEffect, useState } from 'react';
import { listarChamados, concluirChamado } from '../service/Chamado';

export default function Chamados() {
  const [chamados, setChamados] = useState([]);

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

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Lista de Chamados</h2>
      {chamados.length === 0 ? (
        <p>Nenhum chamado disponível.</p>
      ) : (
        <ul>
          {chamados.map((chamado) => (
            <li key={chamado.id}>
              <strong>{chamado.titulo}</strong>: {chamado.descricao}
              <button
                onClick={() => handleConcluir(chamado.id)}
                style={{ marginLeft: "10px", background: "green", color: "white" }}
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
