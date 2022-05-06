import { Fragment, useContext } from "react";
import UserContext from "../../store/user-context";
import estilos from "./Header.module.css";

const Header = () => {
  const { nombreUsuario, logout } = useContext(UserContext);

  const onLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <header className={estilos.header}>
        <h1>Gitmefy</h1>
        {nombreUsuario && (
          <div>
            <span className={estilos.bienvenida}>{`Bienvenido ${nombreUsuario}`}</span>
            <button className={estilos.button} onClick={onLogout}>
              Cambiar de usuario
            </button>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
