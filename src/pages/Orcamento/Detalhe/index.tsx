import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Image } from "react-bootstrap";
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
      <div>
        <Button
          className="float-right"
          onClick={back}
          variant="danger"
          size="sm"
        >
          Voltar
        </Button>
      </div>
      <br />
      <h1>ORÇAMENTO DETALHADO</h1>
      <br />
      <Row>
        <Col>Cliente : {orcamento.nome}/ {orcamento.cpfCnpj}</Col>
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
                <td>{item.comprimento == 0 ? "" : item.comprimento}</td>
                <td>{item.largura == 0 ? "" : item.largura}</td>
                <td>{item.m2 == 0 ? "" : item.m2 / item.quantidade}</td>
                <td>{item.m2 == 0 ? "" : item.m2}</td>
                <td>{item.valorUnitario}</td>
                <td>{item.valorTotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}</td>                                                      
              </tr>
                ))}
          </tbody>
        </Table>

        <h3 className="total"> {area.total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}</h3>

        <hr></hr>
        </div>
      ))}

        {/* <h3>BANHEIRO MASCULINO PRETO SÃO GABRIEL</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Produto</th>
              <th>Largura</th>
              <th>Comprimento</th>
              <th>M²</th>
              <th>M² Total</th>
              <th>Valor M²</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7</td>
              <td>DIVISÓRIA</td>
              <td>1,54</td>
              <td>1,82</td>
              <td>2,4934</td>
              <td>19,6196</td>
              <td>360,00</td>
              <td>7063,05</td>
            </tr>
            <tr>
              <td>7</td>
              <td>DIVISÓRIA</td>
              <td>0,22</td>
              <td>1,82</td>
              <td>0,4004</td>
              <td>2,8028</td>
              <td>360,00</td>
              <td>1.009,00</td>
            </tr>
            <tr>
              <td>9</td>
              <td>DIVISÓRIA MICTÓRIO</td>
              <td>1,22</td>
              <td>0,62</td>
              <td>0,5124</td>
              <td>6,8076</td>
              <td>360,00</td>
              <td>2.450,73</td>
            </tr>

            <tr>
              <td>1</td>
              <td>LAVATÓRIO</td>
              <td>3,2</td>
              <td>1,1</td>
              <td>3,52</td>
              <td>3,52</td>
              <td>360,00</td>
              <td>1.267,20</td>
            </tr>

            <tr>
              <td>4</td>
              <td>PÉ LATERAL</td>
              <td>0,9</td>
              <td>1</td>
              <td>0,9</td>
              <td>3,6</td>
              <td>360,00</td>
              <td>1.296,00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>PNE</td>
              <td>1,5</td>
              <td>1</td>
              <td>1,5</td>
              <td>1,5</td>
              <td>360,00</td>
              <td>540,00</td>
            </tr>
            <tr>
              <td>17</td>
              <td>PRATELEIRAS</td>
              <td>0,19</td>
              <td>1</td>
              <td>0,19</td>
              <td>3,23</td>
              <td>360,00</td>
              <td>1.162,80</td>
            </tr>
            <tr>
              <td>1</td>
              <td>FILETE</td>
              <td>0,05</td>
              <td>22</td>
              <td>1,1</td>
              <td>1,1</td>
              <td>360,00</td>
              <td>396,00</td>
            </tr>
            <tr>
              <td>31</td>
              <td>ACABAMENTO 1/2 ESQUADRIA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>50</td>
              <td>1.550,00</td>
            </tr>
            <tr>
              <td>112,2</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>1.120,20</td>
            </tr>
            <tr>
              <td>5</td>
              <td>FURO DE CUBA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>33</td>
              <td>165,00</td>
            </tr>
          </tbody>
        </Table> */}

        
        <hr></hr>
      </div>

      <Row>
        <Col>
          <h4 className="total">VALOR TOTAL: {orcamento.total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}</h4>
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
