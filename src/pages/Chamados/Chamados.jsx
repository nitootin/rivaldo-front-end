import React, { useEffect, useState } from 'react';
import { listarChamados, concluirChamado } from '../../service/Chamado';
import { Link } from 'react-router-dom';
import './Chamados.css';

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
      window.location.reload(); 
    } catch (error) {
      console.error('Erro ao concluir chamado:', error);
    }
  };

  return (
    <div className="chamados-container">
      <div className="chamados-header">
        <h2>Lista de Chamados</h2>
        <Link to="/chamados/criar">
          <button className="btn-criar-chamado">Criar Chamado</button>
        </Link>
      </div>

     {chamados.map((chamado) => (
  <div key={chamado.id} className="chamado-card">
    <div className="chamado-info">
      <p className="info-line">
        <span className="info-label">Descrição:</span>
        <span className="info-value">{chamado.descricao}</span>
      </p>
      <p className="info-line">
        <span className="info-label">Categoria:</span>
        <span className="info-value">{chamado.categoria}</span>
      </p>
      <p className="info-line">
        <span className="info-label">Solicitante:</span>
        <span className="info-value">{chamado.solicitante?.nome || chamado.solicitante || "Desconhecido"}</span>
      </p>
    </div>
    {role === 'ADMINISTRADOR' && (
      <button className="btn-concluir" onClick={() => handleConcluir(chamado.id)}>
        Concluir
      </button>
    )}
  </div>
))}
    </div>
  );
}
