import React, { useEffect, useState } from 'react'
import { Button, Table, Badge } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, useHistory } from 'react-router-dom';

import produto from "../../service/produto";


  interface IProduto {
    id: number,
    nome : string,
    idTipoMedida : number,
    quantidade : number,
    valorPago : number,
    valorVenda : number,
}

const Produto : React.FC = ()  => {

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const history = useHistory();

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data } = await produto.listar();
    setProdutos(data);
    console.log(produtos);
  }

  function novo()
  {
    history.push("/produtos/cadastro");
  }

  function editar(id : number)
  {
    history.push(`/produtos/cadastro/${id}`);
  }

  function detalhe(id : number)
  {
    history.push(`/produtos/detalher/${id}`);
  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
      <h1>Produtos</h1>
          <Button variant="dark" size="sm" onClick={novo}>Novo produto</Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor pago</th>
            <th>Valor venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos 
          ?
           produtos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>{item.valorPago}</td>
              <td>{item.valorVenda}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => editar(item.id)}>
                  Editar
                </Button>{" "}
                <Button variant="info" size="sm" onClick={() => detalhe(item.id)}>
                  Visualizar
                </Button>{" "}
                <Button variant="danger" size="sm">
                  Excluir
                </Button>
              </td>
            </tr>
          ))
          :
          "Loading..."
        }
        </tbody>
      </Table>
    </div>
  )
}

export default Produto
