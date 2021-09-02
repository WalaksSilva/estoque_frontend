import IArea from "./IArea";

interface IOrcamento {
  id: number;
  nome: string;
  cpfCnpj: string;
  total: number;
  desconto: number;
  fechado: boolean;
  areas: IArea[];
}

export default IOrcamento;
