import React, { useEffect, useState } from 'react';
import './GerenciarUsuarios.css';
import { listarUsuarios, atualizarStatusUsuario } from '../../service/Usuario';
import { useNavigate } from 'react-router-dom';
import BotaoStatusUsuario from '../../components/BotaoStatusUsuario';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await listarUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }
    fetchUsuarios();
  }, []);

  const handleStatusClick = async (userId) => {
    try {
      await atualizarStatusUsuario({ id: userId });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
    }
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gerenciar Usuários</h2>
        <button className="btn-novo" onClick={() => navigate('/usuarios/cadastrar')}>
          Novo Cadastro
        </button>
      </div>

      {usuarios.map((user) => (
        <div key={user.id} className="usuario-card">
          <div className="usuario-info">
            <p className="info-line">
              <span className="info-label">Nome:</span>
              <span className="info-value">{user.nome}</span>
            </p>
            <p className="info-line">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </p>
            <p className="info-line">
              <span className="info-label">Perfil:</span>
              <span className="info-value">{user.perfil}</span>
            </p>
          </div>

          <div className="usuario-actions">
            <button
              className="btn-editar"
              onClick={() => navigate(`/usuarios/editar/${user.id}`)}
            >
              Editar
            </button>

            <BotaoStatusUsuario usuario={user} onStatusClick={handleStatusClick} />
          </div>
        </div>
      ))}
    </div>
  );
}
