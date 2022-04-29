import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Table, Badge, Row, Col, Form, Image } from 'react-bootstrap';
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

const Produto : React.FC = (props: any)  => {

  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [produtosAll, setProdutosAll] = useState<IProduto[]>([]);
  const history = useHistory();

  useEffect(() => {

    let msg = props?.location?.state;
    if (msg !== undefined) {
      alerta("", msg, "success");
    }
    history.replace(props.location.pathname, undefined);

    carregarProdutos();

  }, []);

  async function carregarProdutos() {
    setLoading(true);

    const response = await produto.listar();

    if(response.status === 200)
    {
      setProdutos(response.data);
      setProdutosAll(response.data);
    }
    else if(response.status !== 200)
    {
      const texto = tratamentoErro(response.status, response.data.errors);

      await alerta("Alerta", texto?.toString(), "error")
      
    }

    setLoading(false);

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

  async function excluir(id : number)
  {
    const response = await produto.excluir(id);

    if(response.status === 200)
    {
      const values  = [...produtos];
      values.splice(values.findIndex(value => value.id === id), 1);
      setProdutos(values);

      await alerta("", "Operação realizada com sucesso.", "success")
    }
    else if(response.status !== 200)
    {
      const texto = tratamentoErro(response.status, response.data.errors);

      await alerta("Alerta", texto?.toString(), "error")
      
    }

    
  }

  function filtro(e: ChangeEvent<HTMLInputElement>) {
    
    if(e.target.value === "" || e.target.value == null )
    {
      const values = [...produtosAll];
      setProdutos(values);
    }
    else
    {
      const values = [...produtosAll];
      let filtro = values.filter((x) => x.nome.toLowerCase().includes(e.target.value.toLowerCase()));
      setProdutos(filtro);
    }

  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
      <h1>Produtos</h1>
          <Button variant="dark" size="sm" onClick={novo}>Novo produto</Button>
      </div>

      <Row>
        <Col>
        <hr />
        <h2>Filtro</h2>
        <Form.Label >Nome</Form.Label>
        <Form.Control
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            filtro(e)
          }
        />
        </Col>
      </Row>

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
      <div className="loading">
        <Image hidden={!loading} src={window.location.origin + "/loading2.gif"} rounded />
      </div>
    </div>
  )
}

export default Produto
