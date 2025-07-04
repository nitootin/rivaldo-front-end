import React from 'react';

export default function BotaoCancelar({ chamado, onCancelarClick }) {
  return (
    <button
      style={{
        backgroundColor: '#dc2626', 
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
      }}
      onClick={() => onCancelarClick(chamado.id)}
    >
      Cancelar
    </button>
  );
}