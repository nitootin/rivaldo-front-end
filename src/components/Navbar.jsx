import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const name = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (name) setUser({ name, role });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f1f1f1", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">Chamados</Link> | <Link to="/usuarios">Usuários</Link>
      </div>
      <div>
        {user.name && (
          <>
            <span style={{ marginRight: "10px" }}>Bem-vindo, {user.name}</span>
            <button onClick={logout}>Sair</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;