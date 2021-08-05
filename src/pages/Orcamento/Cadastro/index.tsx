import { findAllByDisplayValue } from "@testing-library/dom";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
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
import areaAPI from "../../../service/area";
import itemAPI from "../../../service/item";

import swal from "sweetalert";

import "./index.css";
import { tratamentoErro } from "../../../Erro/tratamento";

interface IOrcamento {
  id: number;
  nome: string;
  cpfCnpj: string;
  total: number;
  areas: IArea[];
}

interface IItem {
  id: number;
  idProduto: number;
  produto: IProduto | undefined;
  nome: string;
  largura: number | undefined;
  comprimento: number | undefined;
  m2: number;
  valorUnitario: number;
  valorTotal: number;
  material: boolean;
  quantidade: number;
  descricao: string | undefined;
}

interface IArea {
  nome: string | any;
  total: number;
  itens: IItem[];
}

interface IProduto {
  id: number;
  nome: string;
  idTipoMedida: number;
  idTipoProduto: number;
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

  const [validated, setValidated] = useState(false);
  const [disable, setDisable] = useState(false);
  const [total, setTotal] = useState<string>("");
  const history = useHistory();
  const [itens, setItens] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem>({
    id: 0,
    idProduto: 0,
    produto: undefined,
    nome: "",
    largura: undefined,
    comprimento: undefined,
    m2: 0,
    valorUnitario: 0,
    valorTotal: 0,
    material: true,
    quantidade: 1,
    descricao: undefined,
  });
  const [areas, setAreas] = useState<IArea[]>([]);
  const [idServicos, setIdServicos] = useState<number[]>([]);

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [orcamento, setOrcamento] = useState<IOrcamento>({
    id: 0,
    nome: "",
    cpfCnpj: "",
    total: 0,
    areas: [
      ...areas,
      {
        nome: "",
        total: 0,
        itens: [
          ...itens,
          {
            id: 0,
            idProduto: 0,
            produto: undefined,
            nome: "",
            largura: undefined,
            comprimento: undefined,
            m2: 0,
            valorUnitario: 0,
            valorTotal: 0,
            material: true,
            quantidade: 1,
            descricao: undefined,
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

    if (keyName === "quantidade" && e.target.value === "") {
      value.areas[indexArea].itens[indexItem][keyName] = 1;
    }

    if (keyName === "nome" || keyName === "descricao") {
      value.areas[indexArea].itens[indexItem][keyName] = e.target.value;
    } else if (
      keyName === "quantidade" ||
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

    let servicos = produtos
      .filter((x) => x.idTipoProduto === 2)
      .map((x) => x.id);
    setIdServicos(servicos);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (id !== undefined) {
      orcamento.id = parseInt(id);

      orcamento.areas.map((area) => area.itens.map((item) => item.produto = undefined));

      const response = await orcamentoAPI.editar(id, orcamento);

      if (response.status === 200) {
        history.push("/orcamentos", "Operação realizada com sucesso.");
      } else if (response.status !== 200) {
        const texto = tratamentoErro(response.status, response.data.errors);

        await alerta("Alerta", texto?.toString(), "error");
      }
    } else {
      const response = await orcamentoAPI.criar(orcamento);

      if (response.status === 200) {
        history.push("/orcamentos", "Operação realizada com sucesso.");
      } else if (response.status !== 200) {
        const texto = tratamentoErro(response.status, response.data.errors);

        await alerta("Alerta", texto?.toString(), "error");
      }
    }
  };

  async function alerta(
    titulo: string,
    texto: string | undefined,
    icone: string
  ) {
    swal({
      title: "Alerta",
      text: texto?.toString(),
      icon: "error",
    });
  }

  async function recuperarOrcamento() {
    const { data } = await orcamentoAPI.recuperar(id);

    data.areas.forEach((it: IArea) => {
      it.itens.forEach((i: IItem) => {
        if (i.produto !== undefined && i.produto?.idTipoProduto == 2) {
          i.material = false;
        } else {
          i.material = true;
        }
      });
    });

    setOrcamento(data);
    setTotal(
      data.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    );
  }

  function back() {
    history.goBack();
  }

  function addArea() {
    const value = { ...orcamento };

    value.areas.push({
      nome: "",
      total: 0,
      itens: [
        ...itens,
        {
          id: 0,
          idProduto: 0,
          produto: undefined,
          nome: "",
          largura: undefined,
          comprimento: undefined,
          m2: 0,
          valorUnitario: 0,
          valorTotal: 0,
          material: true,
          quantidade: 1,
          descricao: "",
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
      produto: undefined,
      nome: "",
      largura: undefined,
      comprimento: undefined,
      m2: 0,
      valorUnitario: 0,
      valorTotal: 0,
      material: true,
      quantidade: 1,
      descricao: "",
    });

    setOrcamento(value);
  }

  async function excluirItem(indexArea: number, indexItem: number)
  {
    const value = { ...orcamento };
    
    debugger;
    var id = value.areas[indexArea].itens[indexItem].id;
    const response = await itemAPI.excluir(id);

    value.areas[indexArea].itens.splice(
      indexItem,
      1
    );

    // orcamento.areas[indexArea].itens.splice(
    //   indexItem,
    //   1
    // );

    setOrcamento(value);

    calcularTotal();
    calcularTotalArea(indexArea);
  }

  function setValorUnitario(
    indexArea: number,
    indexItem: number,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const value = { ...orcamento };

    let id = parseInt(e.target.value);

    const prod = produtos.find((x) => x.id === id);
    value.areas[indexArea].itens[indexItem].valorUnitario =
      prod !== undefined ? prod.valorVenda : 0;

    if (prod !== undefined && prod.idTipoProduto == 2) {
      value.areas[indexArea].itens[indexItem].valorTotal =
        prod !== undefined ? prod.valorVenda : 0;

      const quantidade = value.areas[indexArea].itens[indexItem].quantidade;

      value.areas[indexArea].itens[indexItem].comprimento = 0;
      value.areas[indexArea].itens[indexItem].largura = 0;
      value.areas[indexArea].itens[indexItem].m2 = 0;
      value.areas[indexArea].itens[indexItem].material = false;
      value.areas[indexArea].itens[indexItem].valorTotal =
        prod !== undefined ? prod.valorVenda * quantidade : 0;
    } else {
      value.areas[indexArea].itens[indexItem].material = true;
    }

    setOrcamento(value);
  }

  function calcularM2(indexArea: number, indexItem: number) {
    const value = { ...orcamento };

    const quantidade = value.areas[indexArea].itens[indexItem].quantidade;
    const comprimento = value.areas[indexArea].itens[indexItem].comprimento;
    const largula = value.areas[indexArea].itens[indexItem].largura;
    const valorUnitario = value.areas[indexArea].itens[indexItem].valorUnitario;

    if (
      !Number.isNaN(comprimento) &&
      !Number.isNaN(largula) &&
      comprimento !== undefined &&
      largula !== undefined
    ) {
      const m2 = parseFloat((comprimento * largula * quantidade).toFixed(2));
      value.areas[indexArea].itens[indexItem].m2 = m2;

      const totalItem = calcularTotalItem(m2, valorUnitario);

      if(m2 === 0)
      {
        value.areas[indexArea].itens[indexItem].valorTotal = totalItem * quantidade;
      }
      else{
        value.areas[indexArea].itens[indexItem].valorTotal = totalItem;
      }
    }

    setOrcamento(value);
    calcularTotal();
    calcularTotalArea(indexArea);
  }

  function calcularTotalArea(indexArea: number)
  {
    const orc = { ...orcamento };
    let total: number = 0;

    orcamento.areas[indexArea].itens.map((item) => 
      total += item.valorTotal
    )

    orc.areas[indexArea].total = total;
    setOrcamento(orc);
  }

  function calcularTotalItem(m2: number, valor: number) {
    return m2 !== 0 ? parseFloat((m2 * valor).toFixed(2)) : valor;
  }

  function calcularTotal() {
    debugger;

    const orc = { ...orcamento };
    let total: number = 0;
    orcamento.areas.map((area) =>
      area.itens.map((item) => (total += item.valorTotal))
    );

    orc.total = parseFloat(total.toFixed(2));
    setTotal(
      orc.total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );

    orc.total = total;
    orcamento.total = total;

    setOrcamento(orc);
  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
        <h1>Cadastro</h1>
      </div>

      <div>
        <Button
          onClick={addArea}
          variant="dark"
          size="sm"
          className="float-right"
        >
          Adicionar área
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
                  required={true}
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
                  value={orcamento.cpfCnpj}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarOrcamento(e)
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          {orcamento.areas.map((area, index) => (
            <Card>
              <Card.Body>
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
                          required={true}
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
                  <hr />

                  {area.itens.map((item, indexItem) => (
                    <div key={indexItem}>
                      <Row>
                    <Col>
                      <Button
                        className="float-right"
                        onClick={() => excluirItem(index, indexItem)}
                        variant="danger"
                        size="sm"
                      >
                        Excluir
                      </Button>
                    </Col>
                  </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="LAVATÓRIO"
                              name="descricao"
                              value={item.descricao}
                              min="0"
                              step="any"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                atualizarItem(e, index, indexItem)
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Label>Produtos</Form.Label>
                          <Form.Control
                            as="select"
                            defaultValue="Selecione..."
                            name="idProduto"
                            value={item.idProduto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => (
                              atualizarItem(e, index, indexItem),
                              setValorUnitario(index, indexItem, e),
                              calcularM2(index, indexItem),
                              calcularTotal()
                            )}
                          >
                            <option>Selecione...</option>
                            {produtos
                              ? produtos.map((produto) => (
                                  <option
                                    key={produto.id}
                                    value={produto.id}
                                    selected={produto.id === item.idProduto}
                                  >
                                    {produto.nome}
                                  </option>
                                ))
                              : "Loading..."}
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder=""
                              name="quantidade"
                              value={item.quantidade}
                              pattern="[0-9]+([,\.][0-9]+)?"
                              min="0"
                              step="any"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => (
                                atualizarItem(e, index, indexItem),
                                calcularM2(index, indexItem)
                              )}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group>
                            <Form.Label>Comprimento</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="0,500"
                              name="comprimento"
                              value={item.comprimento}
                              pattern="[0-9]+([,\.][0-9]+)?"
                              min="0"
                              step="any"
                              disabled={!item.material}
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
                              value={item.largura}
                              pattern="[0-9]+([,\.][0-9]+)?"
                              min="0"
                              step="any"
                              disabled={!item.material}
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
                              value={item.valorTotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="float-right">
                  <b>
                  {area.total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                              </b>
                </div>
              </Card.Body>
            </Card>
          ))}

          <Card>
            <Card.Body>
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
              <div className="orcamento-button">
                <Button onClick={back} variant="danger" size="sm">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Salvar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default Cadastro;
