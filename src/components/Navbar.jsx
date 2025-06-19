import { Link } from "react-router-dom"

const Navbar = ({user}) => {

    return(
        <nav>
            <ul>
                <li><Link to={"/"}> Chamados</Link></li>
                {user.role === "ADMINISTRADOR" && <li><Link to={"/Usuarios"}> Usuarios </Link></li>}
            </ul>
            <div className="user-info">
                {user ? (
                    <span>Bem vindo</span>
                ):(
                    <span>você não está logado</span>
                )}
            </div>




        </nav>
    )
}

export default Navbar;


