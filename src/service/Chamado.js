
const API_URL = "http://localhost:8080/api/chamado";

export async function listarChamados(email) {
  const url = `${API_URL}/${encodeURIComponent(email)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao listar chamados");
  return await response.json();
}

export async function criarChamado(chamado) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(chamado)
  });
  if (!response.ok) throw new Error("Erro ao criar chamado");
  return await response.json();
}


export async function concluirChamado(id) {
  const chamado = { id }; 

  const response = await fetch('http://localhost:8080/api/chamado/atualizar/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(chamado)
  });

  if (!response.ok) {
    throw new Error(`Erro ao concluir chamado: ${response.statusText}`);
  }

  return await response.json();
}


export async function cancelarChamado(id) {
  const response = await fetch('http://localhost:8080/api/chamado/cancelar/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id }) // <-- ESSENCIAL!
  });

  if (!response.ok) {
    throw new Error(`Erro ao cancelar chamado: ${response.statusText}`);
  }

  return await response.json();
}
