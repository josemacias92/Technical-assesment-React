import React from "react";
import IssueData from "../../models/IssueData";
import classes from "./Item.module.css";

const Item: React.FC<{ datos: IssueData; onClick: (id: number) => void }> = ({
  datos: { id, tipo, titulo, autor, fecha, comentarios, etiquetas },
  onClick,
}) => {
  const openIssue = (evento: React.MouseEvent<HTMLTableRowElement>) => {
    onClick(id);
    console.log("Click:" + id);
  };

  return (
    <tr className={classes.item} onClick={openIssue}>
      <td className={classes.tipo}>
        <span className="material-symbols-outlined">
          {tipo === "issue" ? "adjust" : "merge"}
        </span>
      </td>
      <td className={classes.titulo}>{titulo}</td>
      <td className={classes.autor}>{autor}</td>
      <td className={classes.fecha}>{fecha.toDateString()}</td>
      <td className={classes.comentarios}>{comentarios}</td>
      <td className={classes.etiquetas}>
        {etiquetas.length > 0 ? (
          etiquetas.map((etiqueta) => (
            <p key={`${id}_${etiqueta}`}>{`#${etiqueta}`}</p>
          ))
        ) : (
          <p className={classes.ninguno}>ninguna</p>
        )}
      </td>
    </tr>
  );
};

export default Item;
