
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


export async function atualizarUsuario(usuario) {
  try {
    const response = await fetch("http://localhost:8080/api/pessoa", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

export async function atualizarStatusUsuario(usuario) {
  try {
    const response = await fetch("http://localhost:8080/api/pessoa/atualizar/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar status do usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    throw error;
  }
}
