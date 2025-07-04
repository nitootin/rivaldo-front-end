import React from 'react';

export default function BotaoStatusUsuario({ usuario, onStatusClick }) {
  const isAtivado = usuario.status === 'ATIVADO';

  const btnStyle = {
    marginTop: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    backgroundColor: isAtivado ? 'red' : 'green',
    color: 'white',
  };

  return (
    <button style={btnStyle} onClick={() => onStatusClick(usuario.id)}>
      {isAtivado ? (
        <>
          <span style={{ marginRight: '8px' }}>🔴</span>Desativar
        </>
      ) : (
        <>
          <span style={{ marginRight: '8px' }}>🟢</span>Ativar
        </>
      )}
    </button>
  );
}
