
import Markdown from 'react-markdown'
import CommentData from "../../models/CommentData";
import estilos from "./Comment.module.css";

const Comment: React.FC<{ datos: CommentData }> = ({
  datos: { autor, relacion, fecha, body },
}) => {
  const date = fecha.toDateString();
  return (
    <li className={estilos.comentario}>
      <div>
        <div className={estilos.autor}>
          <h3 className={estilos.nombre}>{`@${autor}`}</h3>
          {relacion !== "NONE" && <span className={estilos.relacion}>{relacion}</span>}
          <span className={estilos.fecha}>{date}</span>
        </div>

          <span className={estilos.body}><Markdown>{body}</Markdown></span>
      </div>
    </li>
  );
};

export default Comment;
