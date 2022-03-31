import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Image } from "react-bootstrap";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import orcamentoAPI from "../../../service/orcamento";
import IOrcamento from "../../../Interface/IOrcamento";
import IArea from "../../../Interface/IArea";
import IItem from "../../../Interface/IItem";
import Orcamento from "..";
import IProduto from "../../../Interface/IProduto";

const Detalhe: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<IProduto>({
    id: 0,
    idTipoMedida: 0,
    idTipoProduto: 0,
    nome: "",
    quantidade: 0,
    valorPago: 0,
    valorVenda: 0,
    foto: "",
  });
  const [hidden, setHidden] = useState(true);
  const [hiddenButton, setHiddenButton] = useState(false);
  const [itens, setItens] = useState<IItem[]>([]);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [orcamento, setOrcamento] = useState<IOrcamento>({
    id: 0,
    nome: "",
    cpfCnpj: "",
    total: 0,
    desconto: 0,
    fechado: false,
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
            quantidade: 0,
            nome: "",
            largura: undefined,
            comprimento: undefined,
            m2: 0,
            valorUnitario: 0,
            valorTotal: 0,
            produto: produto,
            descricao: "",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    recuperarOrcamento();
  }, [id]);

  async function recuperarOrcamento() {
    const { data } = await orcamentoAPI.recuperar(id);
    setOrcamento(data);
  }

  function back() {
    history.goBack();
  }

  function print() {
    setHiddenButton(!hiddenButton);
    setTimeout(() => {
      window.print();
      setHiddenButton(false);
    }, 3);
  }

  function hiddenValue() {
    setHidden(!hidden)
  }

  return (
    <div className="container">
      <Row>
        <Col xs={2} md={2}>
          <Image src={window.location.origin + "/logo1.1.png"} rounded />
        </Col>
        <Col xs={7} md={7}>
          <br />
          <br />
          <h3>Um novo conceito em lapidar sonhos</h3>
        </Col>
        <Col xs={3} md={3}>
          <br />
          <br />
          <p>
            <b>Endereço:</b> Quadra AC 419 Conjunto I, 2, Lote 1 <br />
            <b>Celular:</b> (61) 98493-8607 <br />
            <b>Telefone:</b> (61) 3525-7728 <br />
          </p>
        </Col>
      </Row>
      <hr></hr>
      <div hidden={hiddenButton}>
        <Button
          className="float-right"
          onClick={print}
          variant="primary"
          size="sm"
        >
          Imprimir
        </Button>
        <Button
          hidden={hidden}
          className="float-right"
          onClick={hiddenValue}
          variant="danger"
          size="sm"
        >
          <IoIosEyeOff />
        </Button>
        <Button
          hidden={!hidden}
          className="float-right"
          onClick={hiddenValue}
          variant="light"
          size="sm"
        >
          <IoIosEye />
        </Button>
      </div>
      <br />
      <h1>ORÇAMENTO DETALHADO</h1>
      <br />
      <Row>
        <Col>
          Cliente : {orcamento.nome} / {orcamento.cpfCnpj}
        </Col>
      </Row>

      <br />

      <br />

      <br />

      <div>
        {orcamento.areas.map((area, index) => (
          <div>
            <h3>{area.nome}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Quantidade</th>
                  <th>Produto</th>
                  <th>Comprimento</th>
                  <th>Largura</th>
                  <th>M²</th>
                  <th>M² Total</th>
                  <th>Valor M²</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {area.itens.map((item, indexItem) => (
                  <tr>
                    <td>{item.quantidade}</td>
                    <td>{item.descricao}</td>
                    <td>{item.comprimento == 0 || !hidden ? "" : item.comprimento}</td>
                    <td>{item.largura == 0 || !hidden ? "" : item.largura}</td>
                    <td>{item.m2 == 0 || !hidden ? "" : item.m2 / item.quantidade}</td>
                    <td>{item.m2 == 0 ? "" : item.m2}</td>
                    <td>{item.valorUnitario}</td>
                    <td>
                      {item.valorTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h3 className="total">
              {" "}
              {area.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h3>

            <hr></hr>
          </div>
        ))}

        <hr></hr>
      </div>

      <Row hidden={orcamento.desconto == 0}>
        <Col>
          <h4 className="total">
            DESCONTO: -{" "}
            {orcamento.desconto.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="total">
            TOTAL:{" "}
            {(orcamento.total - orcamento.desconto).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h4>
        </Col>
      </Row>

      <hr></hr>

      {/* <Row>
        <Col><h4>DESCONTO : (10,5%) R$ -6.539,10</h4></Col>
      </Row>
      <Row>
        <Col>
          <h3>VALOR TOTAL COM DESCONTO : R$ 55.738,03</h3>
        </Col>
      </Row> */}
    </div>
  );
};

export default Detalhe;
