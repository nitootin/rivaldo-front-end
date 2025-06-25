import { useState } from "react";
import { useEffect } from "react";
import { listarUsuarios } from "../service/Usuario";

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

      return (
    <div style={{ padding: "20px" }}>
      <h2>Gerenciar Usuários</h2>
      <button onClick={irParaCadastro}>Novo Cadastro</button>
            <ul>
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