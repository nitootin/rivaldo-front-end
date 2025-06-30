import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../service/Cadastro';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    perfil: 'USUARIO',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarUsuario(formData);
      alert('Usuário cadastrado com sucesso!');
      navigate('/usuarios/gerenciar');
    } catch (error) {
      alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Perfil:</label>
          <select
            name="perfil"
            value={formData.perfil}
            disabled
            style={{ backgroundColor: '#e5e7eb', cursor: 'not-allowed' }}
          >
            <option value="USUARIO">USUÁRIO</option>
          </select>
        </div>

        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
