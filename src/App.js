import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound';
import Chamados from './pages/Chamados/Chamados';
import CriarChamado from './pages/CriarChamado/CriarChamado';
import GerenciarUsuarios from './pages/GerenciarUsuarios/GerenciarUsuarios';
import Cadastro from './pages/Cadastro/Cadastro'; 
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import EditarUsuario from './pages/EditarUsuario/EditarUsuario'; 
import { useEffect, useState } from 'react';

function AppWrapper() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const isLogin = location.pathname === '/login';
  const isAuth = localStorage.getItem('auth') === 'true';
  const isAdmin = localStorage.getItem('role') === 'ADMINISTRADOR';

  useEffect(() => {
    if (!isAuth && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
    setAuthChecked(true);
  }, [isAuth, location.pathname, navigate]);

  if (!authChecked) return null;

  return (
    <div className="App" style={{ display: 'flex' }}>
      {!isLogin && isAuth && <Sidebar />}
      <div style={{ marginLeft: !isLogin && isAuth ? '200px' : '0', width: '100%' }}>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              isAuth
                ? <ProtectedRoute><Chamados /></ProtectedRoute>
                : <Navigate to="/login" replace />
            } />
            <Route path="/chamados/criar" element={
              isAuth
                ? <ProtectedRoute><CriarChamado /></ProtectedRoute>
                : <Navigate to="/login" replace />
            } />
            <Route path="/usuarios/gerenciar" element={
              isAuth && isAdmin
                ? <GerenciarUsuarios />
                : <Navigate to="/login" replace />
            } />
            <Route path="/usuarios/cadastrar" element={
              isAuth && isAdmin
                ? <Cadastro />
                : <Navigate to="/login" replace />
            } />
            <Route path="/usuarios/editar/:id" element={ 
              isAuth && isAdmin
                ? <EditarUsuario />
                : <Navigate to="/login" replace />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
