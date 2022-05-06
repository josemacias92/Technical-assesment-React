import React, { useReducer } from "react";
import IssueData from "../models/IssueData";
import UserContext from "./user-context";

const defaultRepoState = {
  idUsuario: 0,
  nombreUsuario: undefined,
  repos: [],
  selectedRepoIndex: 0,
  reposTotalPags: 0,
  reposCurrentPag: 1,
  issues: [],
  selectedIssueId: 0,
  issuesTotalPags: 0,
  issuesCurrentPag: 1,
};

const acciones = {
  SET_USER: "SET_USER",
  SET_REPO_INDEX: "SET_REPO_INDEX",
  SET_REPOS_PAGE: "SET_REPOS_PAGE",
  SET_SELECTED_ISSUE_ID: "SET_SELECTED_ISSUE_ID",
  SET_ISSUES: "SET_ISSUES",
  SET_ISSUES_PAGE: "SET_ISSUES_PAGE",
  SET_TOTAL_ISSUES_PAGES: "SET_TOTAL_ISSUES_PAGES",
};

const repoReducer = (state: any, action: any) => {
    switch (action.type) {
    case acciones.SET_USER:
      return {
        ...state,
        idUsuario: action.id,
        nombreUsuario: action.nombre,
        repos: action.repos,
        reposTotalPags: action.reposPags,
      };
    case acciones.SET_REPO_INDEX:
      return {
        ...state,
        selectedRepoIndex: action.indice,
      };
    case acciones.SET_REPOS_PAGE:
      return {
        ...state,
        reposCurrentPag: action.pagina,
      };
    case acciones.SET_ISSUES:
      return {
        ...state,
        issues: action.issues,
      };
    case acciones.SET_SELECTED_ISSUE_ID:
      return {
        ...state,
        selectedIssueId: action.id,
      };
    case acciones.SET_ISSUES_PAGE:
      return {
        ...state,
        issuesCurrentPag: action.pagina,
      };
    case acciones.SET_TOTAL_ISSUES_PAGES:
      return {
        ...state,
        issuesTotalPags: action.totalPags,
      };
    default:
      return { ...state };
  }
};

const UserProvider: React.FC<{ children: any }> = ({ children }) => {
  const [repoState, dispatchRepoAction] = useReducer(
    repoReducer,
    defaultRepoState
  );

  const setUsuario = (
    id: number,
    nombre: string | undefined,
    reposPags: number,
    repos: { id: string; name: string; issuesTotalPags: number }[]
  ) => {
    dispatchRepoAction({
      type: acciones.SET_USER,
      id,
      nombre,
      reposPags,
      repos,
    });
  };

  const setRepoIndex = (indice: number) => {
    dispatchRepoAction({ type: acciones.SET_REPO_INDEX, indice });
  };

  const setReposPage = (pagina: number) => {
    dispatchRepoAction({ type: acciones.SET_REPOS_PAGE, pagina });
  };

  const setIssues = (issues: IssueData[]) => {
    dispatchRepoAction({ type: acciones.SET_ISSUES, issues });
  };

  const setSelectedIssueId = (id: number) => {
    dispatchRepoAction({ type: acciones.SET_SELECTED_ISSUE_ID, id });
  };

  const setIssuesPage = (pagina: number) => {
    dispatchRepoAction({ type: acciones.SET_ISSUES_PAGE, pagina });
  };

  const setTotalIssuesPages = (totalPags: number) => {
    dispatchRepoAction({ type: acciones.SET_TOTAL_ISSUES_PAGES, totalPags });
  };

  const repoContext = {
    idUsuario: repoState.idUsuario,
    nombreUsuario: repoState.nombreUsuario,
    repos: repoState.repos,
    selectedRepoIndex: repoState.selectedRepoIndex,
    reposTotalPags: repoState.reposTotalPags,
    reposCurrentPag: repoState.reposCurrentPag,
    issues: repoState.issues,
    selectedIssueId: repoState.selectedIssueId,
    issuesTotalPags: repoState.issuesTotalPags,
    issuesCurrentPag: repoState.issuesCurrentPag,
    setUsuario,
    setRepoIndex,
    setReposPage,
    setIssues,
    setSelectedIssueId,
    setIssuesPage,
    setTotalIssuesPages,
  };

  return (
    <UserContext.Provider value={repoContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
