import React, { useEffect, useState } from 'react'
import { Button, Table, Badge } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, useHistory } from 'react-router-dom';
import { tratamentoErro } from '../../Erro/tratamento';

import produto from "../../service/produto";
import swal from 'sweetalert';
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
    const response = await produto.listar();

    if(response.status === 200)
    {
      setProdutos(response.data);
    }
    else if(response.status !== 200)
    {
      const texto = tratamentoErro(response.status, response.data.errors);

      await alerta("Alerta", texto?.toString(), "error")
      
    }

  }

  async function alerta(titulo : string, texto : string | undefined, icone : string) {
    swal({
      title: titulo,
      text: texto?.toString(),
      icon: icone
    });
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

  function excluir(id : number)
  {
    const values  = [...produtos];
    values.splice(values.findIndex(value => value.id === id), 1);
    setProdutos(values);
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
      <Table striped bordered hover className="text-center" variant="dark">
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
           produtos.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
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
                <Button variant="danger" size="sm" onClick={() => excluir(item.id)}>
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
