
const API_URL = "http://localhost:8080/api/chamado";

export async function listarChamados() {
  const response = await fetch(API_URL);
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
  const response = await fetch(`${API_URL}/concluir/${id}`, {
    method: "PUT"
  });
  if (!response.ok) throw new Error("Erro ao concluir chamado");
}
