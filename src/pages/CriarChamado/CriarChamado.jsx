import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarChamado } from '../../service/Chamado';
import { toast } from 'react-toastify';

export default function CriarChamado() {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('APLICATIVO');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      alert("Usuário não autenticado.");
      return;
    }

    const novoChamado = {
      descricao: descricao.trim(),
      categoria: categoria.toUpperCase(),  
      solicitante: { id: user.id }        
    };

    try {
      await criarChamado(novoChamado);
       toast.success("Chamado criado com sucesso!");
      navigate('/');
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      toast.error("Erro ao criar chamado!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', color: '#1e293b' }}>
      <h2>Criar Novo Chamado</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{ width: '95%', padding: '12px', borderRadius: '9px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Categoria:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '9px' }}
          >
            <option value="APLICATIVO">APLICATIVO</option>
            <option value="PERIFERICO">PERIFERICO</option>
            <option value="HARDWARE">HARDWARE</option>
            <option value="INTERNET">INTERNET</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '9px',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          Criar Chamado
        </button>
      </form>
    </div>
  );
}
