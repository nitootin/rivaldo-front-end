import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Chamados from './pages/Chamados';
import CriarChamado from './pages/CriarChamado';
import Usuarios from './pages/Usuarios';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAdmin = localStorage.getItem('role') === 'ADMINISTRADOR';

  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', width: '100%' }}>
          <header className="App-header">
            <Navbar />
          </header>
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
              <Route path="/usuarios" element={
                <ProtectedRoute>
                  <Usuarios />
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
    </BrowserRouter>
  );
}

export default App;