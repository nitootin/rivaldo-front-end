import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from './components/NotFound';
import Chamados from './pages/Chamados';
import CriarChamado from './pages/CriarChamado';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function AppWrapper() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isAdmin = localStorage.getItem('role') === 'ADMINISTRADOR';

  return (
    <div className="App" style={{ display: 'flex' }}>
      {!isLogin && <Sidebar />}
      <div style={{ marginLeft: !isLogin ? '200px' : '0', width: '100%' }}>
        {!isLogin && <Navbar />}
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Chamados />
              </ProtectedRoute>
            } />
            <Route path="/criar-chamado" element={
              <ProtectedRoute>
                <CriarChamado />
              </ProtectedRoute>
            } />
            <Route path="/usuarios/gerenciar" element={
              isAdmin ? <GerenciarUsuarios /> : <NotFound />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppWrapper;
