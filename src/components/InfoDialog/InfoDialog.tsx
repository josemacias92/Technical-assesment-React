import React, { useContext, useEffect, useState } from "react";
import CommentData from "../../models/CommentData";
import UserContext from "../../store/user-context";
import Dialogo from "../UI/Dialogo";
import Comment from "./Comment";
import estilos from "./InfoDialog.module.css";

const parseDescripcion = (body: string): string => {
  let subs = body.substring(
    body.indexOf("Description\n\n") + "Description\n\n".length
  );

  return subs.substring(0, subs.indexOf("\r\\"));
};

const InfoDialog: React.FC<{
  onClose: (evento: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({
  // datos: { id, tipo, titulo, body, autor, fecha, comentarios, etiquetas },
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string>();
  const [comentarios, setComentarios] = useState<CommentData[]>([]);

  const { nombreUsuario, repos, selectedRepoIndex, issues, selectedIssueId } = {
    ...useContext(UserContext),
  };

  const { id, tipo, titulo, body } = issues.filter(
    (i) => i.id === selectedIssueId
  )[0];

  // const descripcion = parseDescripcion(body);

  const cargarComentarios = async () => {
    setHttpError(undefined);
    setIsLoading(true);

    const comments: CommentData[] = [];
    const response = await fetch(
      `https://api.github.com/repos/${nombreUsuario}/${repos[selectedRepoIndex].name}/issues/${selectedIssueId}/comments`
    );

    if (!response.ok) {
      setIsLoading(false);
      setHttpError("No se ha podido recuperar los comentarios.");
      return;
    }

    const responseData = await response.json();

    for (const comentario of responseData) {
      comments.push({
        id: comentario.id,
        autor: comentario.user.login,
        relacion: comentario.author_association,
        fecha: new Date(comentario.created_at),
        body: comentario.body,
      });
    }

    setIsLoading(false);
    setComentarios(comments);
  };

  useEffect(() => {
    cargarComentarios();
  }, []);

  let commentsPanel;

  if (isLoading) {
    commentsPanel = (
      <section className={estilos.loading}>
        <p>Cargando comentarios...</p>
      </section>
    );
  } else if (httpError) {
    commentsPanel = (
      <section className={estilos.error}>
        <p>{httpError}</p>
      </section>
    );
  } else {
    if (comentarios.length > 0) {
      commentsPanel = (
        <>
          <h4>Comentarios</h4>
          <ul className={estilos.lista}>
            {comentarios.map((comentario) => (
              <Comment key={comentario.id} datos={comentario}></Comment>
            ))}
          </ul>
        </>
      );
    } else {
      commentsPanel = (
        <p className={estilos.ninguno}>
          {`No hay comentarios para este ${tipo}.`}.
        </p>
      );
    }
  }

  return (
    <Dialogo onClose={onClose}>
      <div className={estilos.encabezado}>
        <h2>{`${tipo} #${id}: ${titulo}`}</h2>
      </div>
      {/* <p>{descripcion}</p> */}
      {commentsPanel}
      <div className={estilos.acciones}>
      <button className={estilos.button} onClick={onClose}>
        Cerrar
      </button>
      </div>
    </Dialogo>
  );
};

export default InfoDialog;
