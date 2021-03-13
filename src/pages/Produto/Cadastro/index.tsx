import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import produtoAPI from "../../../service/produto";
import tipoMedidaAPI from "../../../service/tipoMedida";

interface IProduto {
  id?: number | undefined;
  idTipoMedida?: number | undefined;
  nome?: string;
  quantidade?: number | undefined;
  valorPago?: number | undefined;
  valorVenda?: number | undefined;
}

interface ITipoMedida {
  id: number,
  nome: string
}

const Cadastro: React.FC = () => {
  const [tipoMedidas, setTipoMedidas] = useState<ITipoMedida[]>([]);
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [produto, setProduto] = useState<IProduto>({
    id: 0,
    idTipoMedida: undefined,
    nome: "",
    quantidade: undefined,
    valorPago: undefined,
    valorVenda: undefined,
  });

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    carregarDados();
    carregarTipoMedidas();
    if (id !== undefined) {
      recuperarProduto();
    }
  }, [id]);

  async function carregarTipoMedidas() {
    const { data } = await tipoMedidaAPI.listar();
    setTipoMedidas(data);
  }

  async function carregarDados() {
    const { data } = await produtoAPI.listar();
    setProdutos(data);
  }

  async function recuperarProduto() {
    const { data } = await produtoAPI.recuperar(id);
    setProduto(data);
  }

  function back() {
    history.goBack();
  }

  function atualizarModel(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setProduto({
      ...produto,
      [e.target.name]: (Number.isNaN(parseInt(e.target.value)) ? e.target.value : parseInt(e.target.value)), 
    });
  }

  async function onSubmit(e: any){
    e.preventDefault();
    await produtoAPI.editar(id, produto);
    history.push("/produtos");
  };

  return (
    <div className="container">
      <br />
      <div className="orcamento-header">
        <h1>Cadastro de produto</h1>
        <Button onClick={back} variant="dark" size="sm">
          Voltar
        </Button>
      </div>

      <br />

      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                name="nome"
                value={produto.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarModel(e)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Tipo de medida</Form.Label>
            <Form.Control as="select" defaultValue="Selecione..." name="idTipoMedida" onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}>
              <option>Selecione...</option>
              {tipoMedidas.map((item) => (
                <option selected={produto.idTipoMedida == item.id} key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantidade"
              name="quantidade"
              value={produto.quantidade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
            />
          </Col>
          <Col>
            <Form.Label>Valor pago</Form.Label>
            <Form.Control
              type="number"
              placeholder="Valor pago"
              name="valorPago"
              value={produto.valorPago}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
            />
          </Col>
          <Col>
            <Form.Label>Valor venda</Form.Label>
            <Form.Control
              type="number"
              placeholder="Valor venda"
              name="valorVenda"
              pattern='[0-9]{0,5}'
              value={produto.valorVenda}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
            />
          </Col>
        </Row>
        <br />
        <Form.Group>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form.Group>{" "}
      </Form>
    </div>
  );
};

export default Cadastro;
