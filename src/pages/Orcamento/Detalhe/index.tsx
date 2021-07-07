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
            produto: undefined,
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
        <Col>Cliente : {orcamento.nome}/ ESPAÇO CORÁLIA</Col>
      </Row>

      <br />

      <br />

      <br />

      <div>
        <h3>BANHEIRO MASCULINO PRETO SÃO GABRIEL</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Produto</th>
              <th>Largura</th>
              <th>Comprimento</th>
              {/* <th>ML A/C</th>
              <th>ML ML 45º</th> */}
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

            {/* <tr>
              <td>1</td>
              <td>LAVATÓRIO/ILHA</td>
              <td>4</td>
              <td>1,1</td>
              <td>4,4</td>
              <td>4,4</td>
              <td>360,00</td>
              <td>1.584,00</td>
            </tr> */}
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
        </Table>

        <h3 className="total"> R$ 18,020,00</h3>

        <hr></hr>

        <h3>BANHEIRO FEMININO PRETO SÃO GABRIEL</h3>
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
              <td>12</td>
              <td>DIVISÓRIA</td>
              <td>1,37</td>
              <td>1,82</td>
              <td>2,4934</td>
              <td>29,9208</td>
              <td>360,00</td>
              <td>12.108,09</td>
            </tr>
            <tr>
              <td>12</td>
              <td>DIVISÓRIA</td>
              <td>0,22</td>
              <td>1,82</td>
              <td>0,4004</td>
              <td>4,8048</td>
              <td>360,00</td>
              <td>1.729,728</td>
            </tr>
            <tr>
              <td>12</td>
              <td>PRATELEIRA</td>
              <td>0,19</td>
              <td>1</td>
              <td>0,19</td>
              <td>2,28</td>
              <td>360,00</td>
              <td>820,80</td>
            </tr>
            <tr>
              <td>1</td>
              <td>LAVATÓRIO</td>
              <td>5,0</td>
              <td>1</td>
              <td>5,0</td>
              <td>5,0</td>
              <td>360,00</td>
              <td>1.800,00</td>
            </tr>
            <tr>
              <td>4</td>
              <td>PÉ LATERAL</td>
              <td>0,9</td>
              <td>0,5</td>
              <td>0,45</td>
              <td>1,8</td>
              <td>360,00</td>
              <td>648,00</td>
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
              <td>35,6</td>
              <td>ACABAMENTO 1/2 ESQUADRIA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>50</td>
              <td>1.780,00</td>
            </tr>
            <tr>
              <td>118,16</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>1.181,6</td>
            </tr>
            <tr>
              <td>7</td>
              <td>FURO DE CUBA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>33</td>
              <td>231,00</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 21.235,22</h3>

        <hr></hr>

        <h3>LAVATORIO SUPERIOR PRETO SÃO GABRIEL</h3>
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
              <td>2</td>
              <td>LAVATÓRIO</td>
              <td>1,2</td>
              <td>1</td>
              <td>1,2</td>
              <td>2,4</td>
              <td>360,00</td>
              <td>864,00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ACABAMENTO 1/2 ESQUADRIA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>50</td>
              <td>150,00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>30,00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>FURO DE CUBA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>33</td>
              <td>66,00</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 1.110,00</h3>

        <hr></hr>

        <h3>LAVATORIO SUPERIOR PRETO SÃO GABRIEL</h3>
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
              <td>1</td>
              <td>LAVATÓRIO</td>
              <td>1,3</td>
              <td>1</td>
              <td>1,3</td>
              <td>1,3</td>
              <td>360,00</td>
              <td>468,00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>LAVATÓRIO</td>
              <td>1,2</td>
              <td>1</td>
              <td>1,2</td>
              <td>1,2</td>
              <td>360,00</td>
              <td>432,00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ACABAMENTO 1/2 ESQUADRIA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>50</td>
              <td>150,00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>30,00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>FURO DE CUBA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>33</td>
              <td>66,00</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 1.146,00</h3>

        <hr></hr>

        <h3>PEITORIS</h3>
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
              <td>11</td>
              <td>PEITORIL</td>
              <td></td>
              <td></td>
              <td></td>
              <td>3,514</td>
              <td>330</td>
              <td>1.159,65</td>
            </tr>
            <tr>
              <td>37,38</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>372,80</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 1.532,45</h3>

        <hr></hr>

        <h3>SOLEIRAS</h3>
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
              <td>25</td>
              <td>SOLEIRA</td>
              <td></td>
              <td></td>
              <td></td>
              <td>34,7826</td>
              <td>330</td>
              <td>11.478,26</td>
            </tr>
            <tr>
              <td>95,52</td>
              <td>ACABAMENTO SIMPLES RETO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>10</td>
              <td>955,20</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 12.433,46</h3>

        <hr></hr>

        <h3>FRETES</h3>
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
              <td>1</td>
              <td>FRETE</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>800</td>
              <td>800,00</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 800,00</h3>

        <hr></hr>

        <h3>INSTALAÇÕES</h3>
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
              <td>1</td>
              <td>INSTALAÇÃO</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>6.000</td>
              <td>6.000,00</td>
            </tr>
          </tbody>
        </Table>

        <h3 className="total"> R$ 6.000,00</h3>

        <hr></hr>
      </div>

      <Row>
        <Col>
          <h4>VALOR TOTAL: R$ 62.277,13</h4>
        </Col>
      </Row>
      <Row>
        <Col><h4>DESCONTO : (10,5%) R$ -6.539,10</h4></Col>
      </Row>
      <Row>
        <Col>
          <h3>VALOR TOTAL COM DESCONTO : R$ 55.738,03</h3>
        </Col>
      </Row>
    </div>
  );
};

export default Detalhe;
