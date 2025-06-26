import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <ul>
          <li><Link to="/">Chamados</Link></li>
          {role === 'ADMINISTRADOR' && (
            <li><Link to="/usuarios/gerenciar">Usuários</Link></li>
          )}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <p className="username">Bem-vindo, {username}</p>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
};

export default Sidebar;
