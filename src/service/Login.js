
export async function loginUsuario({ email, senha }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  };

  try {
    const response = await fetch("http://localhost:8080/api/pessoa/login", options);
    if (!response.ok) {
      throw new Error("Erro de autenticação");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}
