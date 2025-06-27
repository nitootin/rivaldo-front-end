import React, { useEffect, useState } from 'react';
import './GerenciarUsuarios.css';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosMock = [
      { id: 1, nome: 'phillip', email: 'phillip.mlk@gmail.com' }
    ];
    setUsuarios(usuariosMock);
  }, []);

  const handleEditar = (id) => {
    alert(`Editar usuário com id: ${id}`);
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h2>Gerenciar Usuários</h2>
        <button className="btn-novo" onClick={() => alert('Novo cadastro')}>
          Novo Cadastro
        </button>
      </div>

      {usuarios.map((user) => (
        <div key={user.id} className="usuario-card">
          <div>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <button className="btn-editar" onClick={() => handleEditar(user.id)}>
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
