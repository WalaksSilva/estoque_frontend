import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import orcamento from "../../../service/orcamento";
import produto from "../../../service/produto";

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

interface IProduto {
  id: number;
  nome: string;
  idTipoMedida: number;
  quantidade: number;
  valorVenda: number;
}

interface IItem {
  id: number;
  idProduto: number;
  // produto: IProduto;
  nome: string;
  largura: number;
  comprimento: number;
  m2: number;
  valorUnitario: number;
  valorTotal: number;
}

interface IArea {
  nome: string;
  itens: IItem[];
}

const Cadastro: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [itens, setItens] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem>({
    id: 0,
    idProduto: 0,
    // produto: IProduto;
    nome: "",
    largura: 0,
    comprimento: 0,
    m2: 0,
    valorUnitario: 0,
    valorTotal: 0,
  });
  const [areas, setAreas] = useState<IArea[]>([
    {
      nome: "",
      itens: [
        ...itens,
        {
          id: 0,
          idProduto: 0,
          // produto: IProduto;
          nome: "",
          largura: 0,
          comprimento: 0,
          m2: 0,
          valorUnitario: 0,
          valorTotal: 0,
        },
      ],
    },
  ]);

  console.log(areas);

  const [orcamentoProdutos, setOrcamentoProdutos] = useState<
    IOrcamentoProduto[]
  >([]);
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [model, setModel] = useState<IOrcamento>({
    id: 0,
    nome: "",
    total: 0,
    orcamentoProdutos: [],
  });

  useEffect(() => {
    carregarProdutos();
    if (id !== undefined) {
      recuperarOrcamento();
    }
  }, [id]);

  function atualizarModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function carregarProdutos() {
    const { data } = await produto.listar();
    setProdutos(data);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    debugger;

    if (id !== undefined) {
      model.id = parseInt(id);
      const response = await orcamento.editar(id, model);
    } else {
      // const response = await orcamento.criar(model);
    }
    history.push("/orcamentos");
    console.log(model);
  };

  async function recuperarOrcamento() {
    const { data } = await orcamento.recuperar(id);

    setModel(data);
  }

  function back() {
    history.goBack();
  }

  function addArea() {
    setAreas([
      ...areas,
      {
        nome: "",
        itens: [
          ...itens,
          {
            id: 0,
            idProduto: 0,
            // produto: IProduto;
            nome: "",
            largura: 0,
            comprimento: 0,
            m2: 0,
            valorUnitario: 0,
            valorTotal: 0,
          },
        ],
      },
    ]);
  }

  function addItem(index: number) {
    const values = [...areas];
    values[index].itens.push({
      id: 0,
      idProduto: 0,
      // produto: IProduto;
      nome: "",
      largura: 0,
      comprimento: 0,
      m2: 0,
      valorUnitario: 0,
      valorTotal: 0,
    });
    setAreas(values);
  }

  function setValorUnitario(indexArea : number, indexItem : number, e: ChangeEvent<HTMLInputElement>){
    const values = [...areas];
    values[indexArea].itens[indexItem].valorUnitario = parseInt(e.target.value);
    setAreas(values);
  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
        <h1>Cadastro</h1>
        <Button onClick={addArea} variant="dark" size="sm">
          Adicionar área
        </Button>
        <Button onClick={back} variant="dark" size="sm">
          Voltar
        </Button>
      </div>

      <br />

      <div className="container">
        <br />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  value={model.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarModel(e)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>CPF/CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CPF/CNPJ"
                  name="cpfCnpj"
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          {areas.map((area, index) => (
            <div>
              <Row>
                <Col>
                  <Button
                    className="float-right"
                    onClick={() => addItem(index)}
                    variant="dark"
                    size="sm"
                  >
                    Adicionar produto
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Área</Form.Label>
                    <Form.Control type="text" placeholder="Área" name="area" />
                  </Form.Group>
                </Col>
              </Row>

              {area.itens.map((item, indexItem) => (
                <div>
                  <Row>
                    <Col>
                      <Form.Label>Produtos</Form.Label>

                      <Form.Control as="select" defaultValue="Selecione..." onChange={(e: ChangeEvent<HTMLInputElement>) => (setValorUnitario(index, indexItem, e))}>
                        <option>Selecione...</option>
                        {produtos
                          ? produtos.map((produto) => (
                              <option key={produto.id} value={produto.valorVenda}>{produto.nome}</option>
                            ))
                          : "Loading..."}
                      </Form.Control>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Comprimento</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Comprimento"
                          name="comprimento"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Largura</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Largura"
                          name="largura"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>M²</Form.Label>
                        <Form.Control type="text" placeholder="M²" name="m2" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Valor unitário</Form.Label>
                        <Form.Control
                          type="text"
                          value={item.valorUnitario}
                          placeholder="Valor unitário"
                          name="valorUnitario"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Valor toal</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Valor total"
                          name="valorTotal"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          ))}
          <hr />
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
