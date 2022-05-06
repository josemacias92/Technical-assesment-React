import { Fragment } from "react";
import ReactDOM from "react-dom";

import estilos from "./Dialogo.module.css";

const Vitrina = ({ onClose }) => {
  return <div className={estilos.vitrina} onClick={onClose} />;
};

const Contenido = ({ children }) => {
  return (
    <div className={estilos.dialogo}>
      <div>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Dialogo = ({ children, onClose }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Vitrina onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<Contenido>{children}</Contenido>, portalElement)}
    </Fragment>
  );
};

export default Dialogo;