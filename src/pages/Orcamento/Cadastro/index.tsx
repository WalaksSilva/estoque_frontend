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
import orcamentoAPI from "../../../service/orcamento";
import produto from "../../../service/produto";

import "../index.css";

interface IOrcamento {
  id: number;
  nome: string;
  total: number;
  areas: IArea[];
}

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

interface IArea {
  nome: string | any;
  itens: IItem[];
}

interface IProduto {
  id: number;
  nome: string;
  idTipoMedida: number;
  quantidade: number;
  valorVenda: number;
}

const Cadastro: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    carregarProdutos();
    if (id !== undefined) {
      recuperarOrcamento();
    }
  }, [id]);

  const [total, setTotal] = useState<string>('')
  const history = useHistory();
  const [itens, setItens] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem>({
    id: 0,
    idProduto: 0,
    nome: "",
    largura: undefined,
    comprimento: undefined,
    m2: 0,
    valorUnitario: 0,
    valorTotal: 0,
  });
  const [areas, setAreas] = useState<IArea[]>([]);

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [orcamento, setOrcamento] = useState<IOrcamento>({
    id: 0,
    nome: "",
    total: 0,
    areas: [
      ...areas,
      {
        nome: "",
        itens: [
          ...itens,
          {
            id: 0,
            idProduto: 0,
            nome: "",
            largura: undefined,
            comprimento: undefined,
            m2: 0,
            valorUnitario: 0,
            valorTotal: 0,
          },
        ],
      },
    ],
  });

  function atualizarOrcamento(e: ChangeEvent<HTMLInputElement>) {
    setOrcamento({
      ...orcamento,
      [e.target.name]: e.target.value,
    });

    console.log(orcamento);
  }

  function atualizarArea(e: ChangeEvent<HTMLInputElement>, indexArea: number) {
    const value = { ...orcamento };

    const keyName = e.target.name;
    if (keyName === "nome") {
      value.areas[indexArea][keyName] = e.target.value;
    }

    setOrcamento(value);
  }

  function atualizarItem(
    e: ChangeEvent<HTMLInputElement>,
    indexArea: number,
    indexItem: number
  ) {
    const value = { ...orcamento };

    const keyName = e.target.name;
    if (keyName === "nome") {
      value.areas[indexArea].itens[indexItem][keyName] = e.target.value;
    } else if (
      keyName === "comprimento" ||
      keyName === "largura" ||
      keyName === "idProduto" ||
      keyName === "m2" ||
      keyName === "valorUnitario" ||
      keyName === "valorTotal"
    ) {
      value.areas[indexArea].itens[indexItem][keyName] = parseFloat(
        e.target.value
      );
    }

    setOrcamento(value);
  }

  async function carregarProdutos() {
    const { data } = await produto.listar();
    setProdutos(data);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (id !== undefined) {
      orcamento.id = parseInt(id);
      const response = await orcamentoAPI.editar(id, orcamento);
    } else {
      const response = await orcamentoAPI.criar(orcamento);
    }
    history.push("/orcamentos");
  };

  async function recuperarOrcamento() {
    const { data } = await orcamentoAPI.recuperar(id);

    setOrcamento(data);
  }

  function back() {
    history.goBack();
  }

  function addArea() {
    const value = { ...orcamento };

    value.areas.push({
      nome: "",
      itens: [
        ...itens,
        {
          id: 0,
          idProduto: 0,
          nome: "",
          largura: undefined,
          comprimento: undefined,
          m2: 0,
          valorUnitario: 0,
          valorTotal: 0,
        },
      ],
    });

    setOrcamento(value);
  }

  function addItem(index: number) {
    const value = { ...orcamento };

    value.areas[index].itens.push({
      id: 0,
      idProduto: 0,
      nome: "",
      largura: undefined,
      comprimento: undefined,
      m2: 0,
      valorUnitario: 0,
      valorTotal: 0,
    });

    setOrcamento(value);
  }

  function setValorUnitario(
    indexArea: number,
    indexItem: number,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const value = { ...orcamento };

    let id = parseInt(e.target.value);
    
    const prod = produtos.find(x => x.id === id);
    value.areas[indexArea].itens[indexItem].valorUnitario = prod !== undefined ? prod.valorVenda : 0;

    setOrcamento(value);
  }

  function calcularM2(indexArea: number, indexItem: number) {
    const value = { ...orcamento };

    const comprimento = value.areas[indexArea].itens[indexItem].comprimento;
    const largula = value.areas[indexArea].itens[indexItem].largura;
    const valorUnitario = value.areas[indexArea].itens[indexItem].valorUnitario;

    if (
      !Number.isNaN(comprimento) &&
      !Number.isNaN(largula) &&
      comprimento !== undefined &&
      largula !== undefined
    ) {
      const m2 = parseFloat((comprimento * largula).toFixed(2));
      value.areas[indexArea].itens[indexItem].m2 = m2;

      value.areas[indexArea].itens[indexItem].valorTotal = calcularTotalItem(
        m2,
        valorUnitario
      );

    }
    
    setOrcamento(value);
    calcularTotal();
  }

  function calcularTotalItem(m2: number, valor: number) {
    return parseFloat((m2 * valor).toFixed(2));
  }

  function calcularTotal() {
    const value = { ...orcamento };
    let total: number = 0;

    orcamento.areas.map((area) =>
      area.itens.map((item) => (total += item.valorTotal))
    );

    value.total = parseFloat(total.toFixed(2));
    setTotal(value.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    setOrcamento(value);
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
                  value={orcamento.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarOrcamento(e)
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
          {orcamento.areas.map((area, index) => (
            <div key={index}>
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
                    <Form.Control
                      type="text"
                      placeholder="Área"
                      name="nome"
                      value={area.nome}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        atualizarArea(e, index)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {area.itens.map((item, indexItem) => (
                <div key={indexItem}>
                  <Row>
                    <Col>
                      <Form.Label>Produtos</Form.Label>

                      <Form.Control
                        as="select"
                        defaultValue="Selecione..."
                        name="idProduto"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => (
                          atualizarItem(e, index, indexItem),
                          setValorUnitario(index, indexItem, e)
                        )
                        }
                      >
                        <option>Selecione...</option>
                        {produtos
                          ? produtos.map((produto) => (
                              <option
                                key={produto.id}
                                value={produto.id}
                              >
                                {produto.nome}
                              </option>
                            ))
                          : "Loading..."}
                      </Form.Control>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Comprimento</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="0,500"
                          name="comprimento"
                          pattern='[0-9]{0,5}'
                          value={item.comprimento}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => (
                            atualizarItem(e, index, indexItem),
                            calcularM2(index, indexItem)
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Largura</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="0,500"
                          name="largura"
                          pattern='[0-9]{0,5}'
                          value={item.largura}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => (
                            atualizarItem(e, index, indexItem),
                            calcularM2(index, indexItem)
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>M²</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="M²"
                          name="m2"
                          disabled={true}
                          value={item.m2}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarItem(e, index, indexItem)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Valor unitário</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Valor unitário"
                          name="valorUnitario"
                          value={item.valorUnitario}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => (
                            atualizarItem(e, index, indexItem),
                            calcularM2(index, indexItem)
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Sub total</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Valor total"
                          name="valorTotal"
                          disabled={true}
                          value={item.valorTotal}
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
              type="text"
              placeholder="Total"
              name="total"
              disabled={true}
              value={total}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
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
