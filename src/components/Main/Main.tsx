import { Fragment, useContext, useEffect, useState } from "react";
import estilos from "./Main.module.css";
import UsuarioForm from "./UsuarioForm";
import Repository from "./Repository";
import UserContext from "../../store/user-context";
import RepoData from "../../models/RepoData";

export type DatosUsuario = {
  idUsuario: number;
  nombreUsuario: string;
  repos: { id: string; name: string; issuesTotalPags: number }[];
  reposTotalPags: number;
  reposCurrentPag: number;
  issuesCurrentPag: number;
};

export const parseLink = (link: string | null) => {
  let paginas = "";

  if (link) {
    const lastLink = link.split(",").filter((rel) => rel.includes("last"))[0];

    paginas = lastLink?.substring(
      lastLink.indexOf("page=") + "page=".length,
      lastLink.indexOf(">")
    );
  }

  return +paginas;
};

//COMPONENTE
const Main = () => {
  const { idUsuario, setUsuario, reposCurrentPag } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [logged, setLogged] = useState(false);

  const cargarUsuario = (usuario: string) => {
    if (usuario) {
      setLogged(true);
      cargarRepos(`https://api.github.com/users/${usuario}/repos`);
    } else {
      setError("Introduzca un usuario válido, por favor.");
    }
  };

  const cambiarPagina = () => {
    cargarRepos(
      `https://api.github.com/user/${idUsuario}/repos?page=${reposCurrentPag}`
    ).catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  };

  useEffect(() => {
    logged && cambiarPagina();
  }, [reposCurrentPag]);

  const cargarRepos = async (url: string) => {
    setError(undefined);
    setIsLoading(true);

    let idUser = 0;
    let nombreUsuario = "";
    let repos: RepoData[] = [];
    let reposTotalPags = 0;

    const response = await fetch(url);

    if (!response.ok) {
      setIsLoading(false);
      setError(
        `${
          response.status === 404
            ? "El usuario indicado no existe."
            : "No se ha podido conectar con GitHub."
        }`
      );
      return;
    }

    const responseData = await response.json();
    reposTotalPags = parseLink(response.headers.get("link"));
    idUser = responseData[0]?.owner.id;
    nombreUsuario = responseData[0]?.owner.login;

    for (const repository of responseData) {
      repos.push({
        id: repository.id,
        name: repository.name,
      });
    }

    setUsuario(idUser, nombreUsuario, reposTotalPags, repos);
    setIsLoading(false);
  };

  let mainPanel;

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
  } else if (idUsuario) {
    mainPanel = <Repository onCambiarPagina={cambiarPagina} />;
  }

  return (
    <Fragment>
      {!idUsuario && <UsuarioForm onCargarHandler={cargarUsuario} />}
      {mainPanel}
    </Fragment>
  );
};

export default Main;
