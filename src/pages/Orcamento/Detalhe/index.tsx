import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
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

const Detalhe: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [itens, setItens] = useState<IItem[]>([]);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [orcamento, setOrcamento] = useState<IOrcamento>({
    id: 0,
    nome: "",
    cpfCnpj: "",
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

  return (
    <div className="container">
      <div className="text-center">
        <h1>Orçamento</h1>
      </div>
      <div>
        <Button className="float-right" onClick={back} variant="danger" size="sm">
          Voltar
        </Button>
      </div>
      <br />
      <br />
      <Row>
        <Col>Cliente : {orcamento.nome}</Col>
        <Col>CPF/CPJ : {orcamento.cpfCnpj}</Col>
      </Row>

      <br />

      <br />

      <br />

      {orcamento.areas.map((area) => (
        <div>
          <h3>{area.nome}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Largura X comprimento</th>
                <th>M²</th>
                <th>Valor unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {area.itens.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.idProduto}</td>
                  <td>
                    {item.largura} X {item.comprimento}
                  </td>
                  <td>{item.m2}</td>
                  <td>{item.valorUnitario}</td>
                  <td>{item.valorTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Row>
        <Col>
          <h2>Total : {orcamento.total}</h2>
        </Col>
      </Row>
    </div>
  );
};

export default Detalhe;
