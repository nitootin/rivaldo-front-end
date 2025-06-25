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

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isAdmin = localStorage.getItem('role') === 'ADMINISTRADOR';

  return (
    <>
      {!isLogin && (
        <div className="App" style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ marginLeft: '200px', width: '100%' }}>
            <header className="App-header">
              <Navbar />
            </header>
            <main>
              <Routes>
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
      )}

      {isLogin && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
