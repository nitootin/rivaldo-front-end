import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Chamados</Link></li>
        <li><Link to="/usuarios">Usuários</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;