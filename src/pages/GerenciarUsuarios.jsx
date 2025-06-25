import React, { useState, useEffect } from 'react';
import { listarUsuarios, atualizarUsuario } from "../service/Usuario";
import { useNavigate } from 'react-router-dom';

export default function GerenciarUsuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMINISTRADOR') {
      navigate('/');
      return;
    }

    async function fetchUsuarios() {
      try {
        const lista = await listarUsuarios();
        setUsuarios(lista);
      } catch (error) {
        alert("Erro ao buscar usuários.");
      }
    }

    fetchUsuarios();
  }, []);

  const irParaCadastro = () => navigate("/cadastro");

  const handleAtualizar = async (e) => {
    e.preventDefault();
    try {
      const atualizado = {
        ...usuarioEditando,
        email,
        senha
      };
      await atualizarUsuario(atualizado);
      alert("Usuário atualizado com sucesso!");
      setUsuarioEditando(null);
      setEmail("");
      setSenha("");
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch (error) {
      alert("Erro ao atualizar usuário.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gerenciar Usuários</h2>
      <button onClick={irParaCadastro}>Novo Cadastro</button>
      <ul style={{ display: "flex", flexDirection: "column", alignItems: "center", listStyle: "none", padding: 0 }}>
        {usuarios.map(usuario => (
          <li key={usuario.id_Pessoa}>
            {usuario.nome} - {usuario.email}
            <button onClick={() => {
              setUsuarioEditando(usuario);
              setEmail(usuario.email);
              setSenha("");
            }}>Editar</button>
          </li>
        ))}

        {usuarioEditando && (
          <form onSubmit={handleAtualizar} style={{ marginTop: "20px" }}>
            <h3>Editando: {usuarioEditando.nome}</h3>
            <input
              type="email"
              placeholder="Novo Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setUsuarioEditando(null)}>Cancelar</button>
          </form>
        )}
      </ul>
    </div>
  );
}
