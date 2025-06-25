import { useState } from "react";
import { useEffect } from "react";
import { listarUsuarios, atualizarUsuario } from "../service/Usuario";

import { useNavigate } from 'react-router-dom';

export default function GerenciarUsuarios() {
  const navigate = useNavigate();
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

  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);

      return (
    <div style={{ padding: "20px" }}>
      <h2>Gerenciar Usuários</h2>
      <button onClick={irParaCadastro}>Novo Cadastro</button>
            <ul>
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

        {/* Lista de usuários */}
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
            <button
              onClick={() => removerUsuario(usuario.id)}
              style={{ marginLeft: "10px", color: "white", background: "red", border: "none" }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      // Atualiza a lista
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch (error) {
      alert("Erro ao atualizar usuário.");
    }
  };
