import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (e) {
        console.error("Erro ao ler usuário:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <ul>
          <li><Link to="/">Chamados</Link></li>
          {user?.perfil === 'ADMINISTRADOR' && (
            <li><Link to="/usuarios/gerenciar">Usuários</Link></li>
          )}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <p className="username">
          Bem-vindo,<br />
          <strong>{user?.nome || 'usuário'}</strong>
        </p>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
};

export default Sidebar;
