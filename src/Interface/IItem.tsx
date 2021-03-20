interface IItem {
    id: number;
    idProduto: number;
    nome: string;
    largura: number | undefined;
    comprimento: number | undefined;
    m2: number;
    valorUnitario: number;
    valorTotal: number;
  }

  export default IItem;