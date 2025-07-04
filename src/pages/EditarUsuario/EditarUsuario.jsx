import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  listarUsuarios,
  atualizarUsuario,
  atualizarStatusUsuario
} from '../../service/Usuario';
import './EditarUsuario.css';
import { toast } from 'react-toastify';

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    email: '',
    perfil: 'USUARIO',
    senha: '',
    ativo: true
  });

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const usuarios = await listarUsuarios();
        const usuario = usuarios.find(u => u.id === parseInt(id));
        if (usuario) {
          setFormData({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil,
            senha: '',
            ativo: usuario.ativo
          });
        }
      } catch (error) {
        toast.error("Erro ao encontrar usuário!");
      }
    }
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.senha === '') delete payload.senha;
      await atualizarUsuario(payload);
     toast.success("Usuário atualizado com sucesso!");
      navigate('/usuarios/gerenciar');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast.error("Error ao atualizar usuário!");
    }
  };

  const handleToggleStatus = async () => {
    try {
      const atualizado = {
        id: formData.id,
        ativo: formData.ativo
      };
      await atualizarStatusUsuario(atualizado);
      setFormData(prev => ({ ...prev, ativo: !prev.ativo }));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do usuário');
    }
  };

  return (
    <div className="editar-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Perfil:</label>
          <select
            name="perfil"
            value={formData.perfil}
            onChange={handleChange}
          >
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            <option value="USUARIO">USUÁRIO</option>
          </select>
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Deixe em branco se não for alterar"
          />
        </div>

        <button type="submit" className="btn-salvar">
          Salvar Alterações
        </button>
      </form>

      

    </div>
  );
}
