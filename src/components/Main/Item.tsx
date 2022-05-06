import React from "react";
import IssueData from "../../models/IssueData";
import estilos from "./Item.module.css";

const Item: React.FC<{ datos: IssueData; onClick: (id: number) => void }> = ({
  datos: { id, tipo, titulo, autor, fecha, comentarios, etiquetas },
  onClick,
}) => {
  const openIssue = (evento: React.MouseEvent<HTMLTableRowElement>) => {
    onClick(id);
    console.log("Click:" + id);
  };

  return (
    <tr className={estilos.item} onClick={openIssue}>
      <td className={estilos.tipo}>
        <span className="material-symbols-outlined">
          {tipo === "issue" ? "adjust" : "merge"}
        </span>
      </td>
      <td className={estilos.titulo}>{titulo}</td>
      <td className={estilos.autor}>{autor}</td>
      <td className={estilos.fecha}>{fecha.toDateString()}</td>
      <td className={estilos.comentarios}>{comentarios}</td>
      <td className={estilos.etiquetas}>
        {etiquetas.length > 0 ? (
          etiquetas.map((etiqueta) => (
            <p key={`${id}_${etiqueta}`}>{`#${etiqueta}`}</p>
          ))
        ) : (
          <p className={estilos.ninguno}>ninguna</p>
        )}
      </td>
    </tr>
  );
};

export default Item;
