import IssueData from "./IssueData";
import RepoData from "./RepoData";

type UserData = {
    idUsuario: number;
    nombreUsuario: string;
    repos: RepoData[];
    selectedRepoIndex: number;
    reposTotalPags: number;
    reposCurrentPag: number;
    issues: IssueData[];
    selectedIssueId: number;
    issuesTotalPags: number;
    issuesCurrentPag: number;
    setUsuario: (
      id: number,
      nombre: string | undefined,
      reposPags: number,
      repos: any
    ) => void;
    setRepoIndex: (indice: number) => void;
    setReposPage: (pagina: number) => void;
    setIssues: (issues: IssueData[]) => void,
    setSelectedIssueId: (pagina: number) => void;
    setIssuesPage: (pagina: number) => void;
    setTotalIssuesPages: (totalPags: number) => void;
  };

  export default UserData;