import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Col, Form } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams
} from "react-router-dom";
import orcamento from "../../../service/orcamento";

import "../index.css";

interface IOrcamento {
  id: number;
  nome: string;
  total: number;
  orcamentoProdutos: IOrcamentoProduto[];
}

interface IOrcamentoProduto {
  valor: number;
}

const Cadastro: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{id : string}>();


  useEffect(() => {
    if(id !== undefined)
    {
      recuperarOrcamento();
    }
  }, [id]);


  const [model, setModel] = useState<IOrcamento>({
    id : 0,
    nome: "",
    total: 0,
    orcamentoProdutos: [],
  });

  const [orcamentoProdutos, setOrcamentoProdutos] = useState<
    IOrcamentoProduto[]
  >([]);

  function atualizarModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    debugger;

    if(id !== undefined)
    {

      model.id = parseInt(id);
      const response = await orcamento.editar(id, model);
      
    }
    else
    {
      // const response = await orcamento.criar(model);

    }
    history.push("/orcamentos");
    console.log(model);
  };

  async function recuperarOrcamento() {
    const {data} = await orcamento.recuperar(id);

    setModel(data);
  }

  function back () {
    history.goBack();
  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
        <h1>Cadastro</h1>
        <Button onClick={back} variant="dark" size="sm">
          Voltar
        </Button>
      </div>

      <br />

      <div className="container">
        <Form>
          <Form.Row className="align-items-center">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Produtos</Form.Label>
              <Form.Control as="select" defaultValue="Selecione...">
                <option>Selecione...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                name="quantidade"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarModel(e)
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Total</Form.Label>
              <Form.Control
                name="totla"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarModel(e)
                }
              />
            </Form.Group>
          </Form.Row>
          <Button variant="dark" size="sm" type="submit">
            Adicionar
          </Button>
        </Form>

        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              name="nome"
              value={model.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              placeholder="Total"
              name="total"
              value={model.total}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form.Group>{" "}
        </Form>
      </div>
    </div>
  );
};

export default Cadastro;
