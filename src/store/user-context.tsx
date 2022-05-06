import React from "react";
import IssueData from "../models/IssueData";
import UserData from "../models/UserData";

const UserContext = React.createContext<UserData>({
  idUsuario: 0,
  nombreUsuario: "",
  repos: [],
  selectedRepoIndex: 0,
  reposTotalPags: 0,
  reposCurrentPag: 1,
  issues: [],
  selectedIssueId: 0,
  issuesTotalPags: 0,
  issuesCurrentPag: 1,
  setUsuario: (
    id: number,
    nombre: string | undefined,
    reposPags: number,
    repos
  ) => {},
  setRepoIndex: (indice: number) => {},
  setReposPage: (pagina: number) => {},
  setIssues: (issues: IssueData[]) => {},
  setSelectedIssueId: (indice: number) => {},
  setIssuesPage: (pagina: number) => {},
  setTotalIssuesPages: (totalPags: number) => {},
});

export default UserContext;
