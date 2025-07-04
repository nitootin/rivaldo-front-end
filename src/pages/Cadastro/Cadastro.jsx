import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../service/Cadastro';
import { toast } from 'react-toastify';

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
      toast.success("Usuário cadastrado com sucesso!");
      navigate('/usuarios/gerenciar');
    } catch (error) {
      toast.error("erro ao criar usuário!");
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

        <div className="form-group senha-group">
          <div className="senha-label-container">
            <label className="senha-label">Senha:</label>
            <div className="tooltip">
              <span className="tooltip-icon">❓</span>
              <span className="tooltip-text">
                A senha deve ter pelo menos 8 caracteres e conter: letra maiúscula, minúscula, número e caractere especial.
              </span>
            </div>
          </div>
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

       

        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
