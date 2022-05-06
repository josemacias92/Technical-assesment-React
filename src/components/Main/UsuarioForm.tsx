import { useRef } from "react";
import estilos from "./UsuarioForm.module.css";

const UsuarioForm: React.FC<{
  onCargarHandler: (usuario: string) => void
}> = ({onCargarHandler}) => {

  const usuarioRef = useRef<HTMLInputElement>();

  const onCargar = (event: React.FormEvent) => {
    event.preventDefault();
    onCargarHandler(usuarioRef.current.value);
  }

  return (
    <form className={estilos.form} onSubmit={onCargar}>
      <h2>Introduzca el usuario de GitHub</h2>
      <input type="text" ref={usuarioRef}/>
      <button className={estilos.button} type="submit">
        Cargar Datos
      </button>
    </form>
  );
};

export default UsuarioForm;
