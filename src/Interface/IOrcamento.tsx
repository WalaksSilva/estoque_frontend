import IArea from "./IArea";

interface IOrcamento {
  id: number;
  nome: string;
  cpfCnpj: string;
  total: number;
  areas: IArea[];
}

export default IOrcamento;
