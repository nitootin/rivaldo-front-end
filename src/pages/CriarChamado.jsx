import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarChamado } from '../service/Chamado';

export default function CriarChamado() {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('APLICATIVO');
  const solicitante = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await criarChamado({ descricao, categoria });
      alert("Chamado criado com sucesso!");
      navigate('/');
    } catch (error) {
      alert("Erro ao criar chamado.");
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
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Categoria:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="APLICATIVO">APLICATIVO</option>
            <option value="PERIFERICO">PERIFERICO</option>
            <option value="HARDWARE">HARDWARE</option>
            <option value="INTERNE">INTERNE</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Criar Chamado
        </button>
      </form>
    </div>
  );
}
