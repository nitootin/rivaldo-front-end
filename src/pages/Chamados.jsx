import React, { useEffect, useState } from 'react';
import { listarChamados, concluirChamado } from '../service/Chamado';
import { Link } from 'react-router-dom';

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    async function fetchChamados() {
      try {
        const data = await listarChamados();
        setChamados(data);
      } catch (error) {
        console.error('Erro ao buscar chamados:', error);
      }
    }

    fetchChamados();
  }, []);

  const handleConcluir = async (id) => {
    try {
      await concluirChamado(id);
      setChamados(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao concluir chamado:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Lista de Chamados</h2>
        <Link to="/chamados/criar">
          <button style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Criar Chamado
          </button>
        </Link>
      </div>

      {chamados.map((chamado) => (
        <div
          key={chamado.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px 20px',
            margin: '10px 0'
          }}
        >
          <div style={{ flex: 1 }}>
            <p><strong>Descrição:</strong> {chamado.descricao}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p><strong>Categoria:</strong> {chamado.categoria}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p><strong>Solicitante:</strong> {chamado.solicitante?.nome || chamado.solicitante || "Desconhecido"}</p>
          </div>
          {role === 'ADMINISTRADOR' && (
            <button
              onClick={() => handleConcluir(chamado.id)}
              style={{
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Concluir
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
