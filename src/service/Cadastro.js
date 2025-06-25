export async function cadastrarUsuario({ nome, email, senha, cpf }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha, cpf })
  };

  try {
    const response = await fetch("http://localhost:8080/api/pessoa/{login}", options);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const pessoa = await response.json();
    return pessoa;

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    throw error;
  }
}
