type IssueData = {
  id: number;
  tipo: string;
  titulo: string;
  body: string;
  autor: string;
  fecha: Date;
  comentarios: number;
  etiquetas: string[];
};

export default IssueData;
