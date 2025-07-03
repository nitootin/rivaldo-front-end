import React, { useEffect, useState } from 'react';
import './GerenciarUsuarios.css';
import { listarUsuarios } from '../../service/Usuario';
import { useNavigate } from 'react-router-dom';

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
          <button
            className="btn-editar"
            onClick={() => navigate(`/usuarios/editar/${user.id}`)}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
