
import { loginUsuario } from '../service/Login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usuario = await loginUsuario({ email: username, senha });
      if (usuario && usuario.nome) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', usuario.nome);
        localStorage.setItem('role', usuario.papel || 'USUARIO');
        navigate('/');
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } catch (error) {
      alert('Erro ao tentar fazer login.');
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