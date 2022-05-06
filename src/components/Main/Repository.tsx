import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import Issue from "./Item";
import estilos from "./Repository.module.css";
import { parseLink } from "./Main";
import InfoDialog from "../InfoDialog/InfoDialog";
import IssueData from "../../models/IssueData";
import UserContext from "../../store/user-context";

export const tiposListas = {
  repos: "repos",
  issues: "issues",
};

export const cargarDatos = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "No se ha podido acceder a este repositorio: " + response.text()
    );
  }

  return response;
};

const parseLista = (responseData: any) => {
  const issues: IssueData[] = [];

  for (const issue of responseData) {
    const etiquetas = [];

    for (const label of issue.labels) {
      etiquetas.push(label.name);
    }

    issues.push({
      id: issue.number,
      tipo: issue.pull_request ? "pull" : "issue",
      titulo: issue.title,
      body: issue.body,
      autor: issue.user.login,
      fecha: new Date(issue.created_at),
      comentarios: issue.comments,
      etiquetas: etiquetas,
    });
  }
  return issues;
};

//COMPONENTE
const Repository: React.FC<{
  onCambiarPagina: (pagina: number) => void;
}> = ({ onCambiarPagina }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [paginasAMostrar, setPaginasAMostrar] = useState(
    window.screen.width > 497 ? 30 : 10
  );

  window.addEventListener("resize", function (event) {
    setPaginasAMostrar(window.screen.width > 497 ? 30 : 10);
  });

  const {
    nombreUsuario,
    repos,
    selectedRepoIndex,
    reposTotalPags,
    reposCurrentPag,
    issues,
    issuesTotalPags,
    issuesCurrentPag,
    setRepoIndex,
    setReposPage,
    setIssues,
    setSelectedIssueId,
    setIssuesPage,
    setTotalIssuesPages,
  } = { ...useContext(UserContext) };

  const reposList = repos.map((repo) => (
    <option key={repo.id} value={repo.name}>
      {repo.name}
    </option>
  ));

  const seleccionarRepositorio = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(true);
    setRepoIndex(event.target.selectedIndex);
    setIssuesPage(1);
  };

  const closeDialog = (evento: React.MouseEvent<HTMLButtonElement>) => {
    setShowDialog(false);
  };

  const openIssue = (id: number) => {
    setSelectedIssueId(id);
    setShowDialog(true);
  };

  useEffect(() => {
    cargarIssues(selectedRepoIndex).catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [selectedRepoIndex, issuesCurrentPag]);

  const cargarIssues = async (index: number) => {

    setIsLoading(true);
    setError(undefined);

    const url =
      issuesTotalPags === 0
        ? `https://api.github.com/repos/${nombreUsuario}/${repos[index].name}/issues`
        : `https://api.github.com/repositories/${repos[selectedRepoIndex].id}/issues?page=${issuesCurrentPag}`;

    const datos = await cargarDatos(url);
    const issues = parseLista(await datos.json());
    const totalPages = parseLink(datos.headers.get("link"));

    totalPages && setTotalIssuesPages(totalPages);

    setIssues(issues);
    setIsLoading(false);
  };

  const cambiarPaginaRepositorios = (
    evento: React.MouseEvent<HTMLSpanElement>
  ) => {
    const pagina = +evento.currentTarget.getAttribute("data-page") ?? 1;
    const actual = pagina === reposCurrentPag;

    if (!actual) {
      setReposPage(pagina);
      setRepoIndex(0);
      setIssuesPage(1);
    }
  };

  const cambiarPaginaIssues = (evento: React.MouseEvent<HTMLSpanElement>) => {
    const pagina = +evento.currentTarget.getAttribute("data-page") ?? 1;
    const actual = pagina === issuesCurrentPag;

    if (!actual) {
      setIssuesPage(+pagina);
      window.scrollTo(0, 0);
    }
  };

  const paginasSwitch = (lista: string) => {
    let paginaActual: number;
    let totalPags: number;
    let cambiarPagina: (evento: React.MouseEvent<HTMLSpanElement>) => void;

    switch (lista) {
      case tiposListas.issues:
        paginaActual = issuesCurrentPag;
        totalPags = issuesTotalPags;
        cambiarPagina = cambiarPaginaIssues;
        break;
      default:
        paginaActual = reposCurrentPag;
        totalPags = reposTotalPags;
        cambiarPagina = cambiarPaginaRepositorios;
        break;
    }

    return { paginaActual, totalPags, cambiarPagina };
  };

  const crearPaginas = (lista: string) => {
    const paginacion = [];
    const { paginaActual, totalPags, cambiarPagina } = paginasSwitch(lista);
    const umbral = paginasAMostrar / 2;
    let startIndex = 1;
    let endIndex = totalPags;
    let reachStart = paginaActual < umbral;
    let reachEnd = paginaActual + umbral > totalPags;

    if (totalPags > paginasAMostrar) {
      startIndex = reachStart ? 1 : paginaActual - umbral;
      endIndex = reachEnd ? totalPags : startIndex + paginasAMostrar;
    }

    !reachStart &&
      paginacion.push(
        renderPageNumber(lista, 1, `<< 1... `, false, cambiarPagina)
      );

    for (let index = startIndex; index <= endIndex; index++) {
      const seleccionada = index === paginaActual;

      paginacion.push(
        renderPageNumber(
          lista,
          index,
          index.toString(),
          seleccionada,
          cambiarPagina
        )
      );
    }

    !reachEnd &&
      paginacion.push(
        renderPageNumber(
          lista,
          totalPags,
          `...${totalPags} >>`,
          false,
          cambiarPagina
        )
      );

    return totalPags > 0 && <nav className={estilos.nav}>{paginacion}</nav>;
  };

  const renderPageNumber = (
    lista: string,
    indice: number,
    contenido: string,
    seleccionado: boolean,
    cambiarPagina: (evento: React.MouseEvent<HTMLSpanElement>) => void
  ) => {
    return (
      <span
        className={seleccionado ? estilos.selected_pag : estilos.pag}
        key={`${lista}_${contenido}`}
        data-page={indice}
        onClick={cambiarPagina}
      >
        {contenido}
      </span>
    );
  };

  let mainPanel;

  const cabecera = (
    <tr className={estilos.item}>
      <th>Tipo</th>
      <th>Título</th>
      <th>Autor</th>
      <th>Creado</th>
      <th>Comentarios</th>
      <th>Etiquetas</th>
    </tr>
  );

  if (isLoading) {
    mainPanel = (
      <section className={estilos.loading}>
        <p>Cargando datos...</p>
      </section>
    );
  } else if (error) {
    mainPanel = (
      <section className={estilos.error}>
        <p>{error}</p>
      </section>
    );
  } else {
    if (issues.length > 0) {
      mainPanel = (
        <div className={estilos.lista}>
        <table>
          <thead>{cabecera}</thead>
          <tbody>
            {issues.map((item) => (
              <Issue key={item.id} datos={item} onClick={openIssue} />
            ))}
          </tbody>
        </table>
        </div>
      );
    } else {
      mainPanel = (
        <p className={estilos.ninguno}>
          No se han encontrado issues en este repositorio.
        </p>
      );
    }
  }

  return (
    <section className={estilos.panel}>
      <Card>
        <div className={estilos.repo_nav}>
          <select
            name="repos"
            className={estilos.selector}
            onChange={seleccionarRepositorio}
          >
            {reposList}
          </select>
          {crearPaginas(tiposListas.repos)}
        </div>
        {mainPanel}
        {crearPaginas(tiposListas.issues)}
      </Card>
      {showDialog && <InfoDialog onClose={closeDialog}></InfoDialog>}
    </section>
  );
};

export default Repository;
