import React, { useEffect, useState } from 'react';
import './GerenciarUsuarios.css';
import { listarUsuarios } from '../service/Usuario';
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
          <div>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Perfil:</strong> {user.perfil}</p>
          </div>
          <button className="btn-editar" onClick={() => alert(`Editar usuário ${user.nome}`)}>
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
