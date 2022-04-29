import IProduto from "./IProduto";

interface IItem {
    id: number;
    idProduto: number;
    quantidade: number;
    nome: string;
    largura: number | undefined;
    comprimento: number | undefined;
    m2: number;
    ml: number;
    valorUnitario: number;
    valorTotal: number;
    produto: IProduto;
    descricao: string;
  }

  export default IItem;