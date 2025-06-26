import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../service/Login';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usuario = await loginUsuario({ email: username, senha });
      console.log('Resposta completa:', usuario);

      if (usuario && (usuario.nome || usuario.id)) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify(usuario)); 
        localStorage.setItem('role', usuario.perfil || 'USUARIO');
        navigate('/');
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro detalhado:', error);
      if (error.message === 'Erro de autenticação') {
        alert('Credenciais inválidas!');
      } else {
        alert('Erro de conexão com servidor.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
