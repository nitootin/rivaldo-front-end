import React, { useEffect, useState } from 'react';
import { listarChamados, concluirChamado, cancelarChamado } from '../../service/Chamado';
import { Link } from 'react-router-dom';
import './Chamados.css';
import BotaoAcao from '../../components/BotaoAcao';
import BotaoCancelar from '../../components/BotaoCancelar';
import { toast } from 'react-toastify';

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const role = localStorage.getItem('role');

useEffect(() => {
  async function fetchChamados() {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("Email do usuário não encontrado no localStorage!");
        return;
      }
      const data = await listarChamados(email); 
      setChamados(data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  }
  fetchChamados();
}, []);


  const onAcaoClick = async (chamadoId) => {
    try {
      await concluirChamado(chamadoId);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar chamado:', error);
    }
  };

  const onCancelarClick = async (chamadoId) => {
    try {
      await cancelarChamado(chamadoId);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cancelar chamado:', error);
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
            <p className="info-line">
              <span className="info-label">Status:</span>
              <span className="info-value">{chamado.status}</span>
            </p>
          </div>
          {role === 'ADMINISTRADOR' && (
            <div className="botao-container-vertical">
              <BotaoAcao chamado={chamado} onAcaoClick={onAcaoClick} />
              <BotaoCancelar chamado={chamado} onCancelarClick={onCancelarClick} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
