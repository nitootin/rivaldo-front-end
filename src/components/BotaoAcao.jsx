import React from 'react';

export default function BotaoAcao({ chamado, onAcaoClick }) {
  let botaoTexto = '';
  if (chamado.status === 'TRIAGEM') botaoTexto = 'Executar';
  else if (chamado.status === 'ANDAMENTO') botaoTexto = 'Concluir';

  if (!botaoTexto) return null; 

  const botaoStyle = {
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: chamado.status === 'TRIAGEM' ? '#2563eb' : 'green'
  };

  return (
    <button
      style={botaoStyle}
      onClick={() => onAcaoClick(chamado.id)}
    >
      {botaoTexto}
    </button>
  );
}
