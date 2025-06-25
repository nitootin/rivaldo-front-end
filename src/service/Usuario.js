export async function listarUsuarios() {
  try {
    const response = await fetch("http://localhost:8080/api/pessoa");
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw error;
  }
}
