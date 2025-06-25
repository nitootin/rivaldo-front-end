
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cadastrarUsuario } from '../service/Cadastro';

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pessoa = await cadastrarUsuario(form);

      if (pessoa.id_Pessoa > 0) {
        alert('Cadastro realizado com sucesso.');
        navigate('/login');
      } else {
        alert('Login ou email já cadastrados no sistema');
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Ocorreu um erro ao processar a requisição');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input className="input-nome" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input className="input-email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="input-senha" name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        <input className="input-cpf" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
