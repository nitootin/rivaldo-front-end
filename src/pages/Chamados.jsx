import React, { useEffect, useState } from 'react';
import { listarChamados, concluirChamado } from '../service/Chamado';
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
            <p><strong>Descrição:</strong> {chamado.descricao}</p>
          </div>
          <div className="chamado-info">
            <p><strong>Categoria:</strong> {chamado.categoria}</p>
          </div>
          <div className="chamado-info">
            <p><strong>Solicitante:</strong> {chamado.solicitante?.nome || chamado.solicitante || "Desconhecido"}</p>
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
