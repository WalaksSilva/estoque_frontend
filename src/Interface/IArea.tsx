import IItem from "./IItem";

interface IArea {
    nome: string | any;
    total: number;
    itens: IItem[];
  }

  export default IArea;