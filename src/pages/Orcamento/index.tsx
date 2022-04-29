import React, { useState, useEffect, ChangeEvent } from "react";
import { Badge, Button, Table, Form, Row, Col, Image } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import orcamentoAPI from "../../service/orcamento";
import moment from "moment";
import "./index.css";
import { tratamentoErro } from "../../Erro/tratamento";
import swal from "sweetalert";

const Orcamento: React.FC = (props: any) => {
  interface IOrcamento {
    id: number;
    nome: string;
    total: number;
    data: Date;
    fechado: boolean;
    orcamentoProdutos: IOrcamentoProdutos[];
  }

  interface IOrcamentoProdutos {
    valor: number;
  }

  const [loading, setLoading] = useState(false);
  const [orcamentos, setOrcamentos] = useState<IOrcamento[]>([]);
  const [orcamentosAll, setOrcamentosAll] = useState<IOrcamento[]>([]);
  const history = useHistory();

  useEffect(() => {
    let msg = props?.location?.state;
    if (msg !== undefined) {
      alerta("", msg, "success");
    }
    history.replace(props.location.pathname, undefined);

    carregarOrcamentos();
  }, []);

  async function carregarOrcamentos() {
    setLoading(true);
    const response = await orcamentoAPI.listar();

    if (response.status === 200) {
      setOrcamentos(response.data);
      setOrcamentosAll(response.data);
    } else if (response.status !== 200) {
      const texto = tratamentoErro(response.status, response.data.errors);

      await alerta("Alerta", texto?.toString(), "error");
    }

    setLoading(false);
  }

  async function alerta(
    titulo: string,
    texto: string | undefined,
    icone: string
  ) {
    swal({
      title: titulo,
      text: texto?.toString(),
      icon: icone,
    });
  }

  function formarData(data: Date) {
    return moment(data).format("DD/MM/yyyy");
  }

  function novoOrcamento() {
    history.push("/orcamentos/cadastro");
  }

  function editar(id: number) {
    history.push(`/orcamentos/cadastro/${id}`);
  }

  function detalhe(id: number) {
    history.push(`/orcamentos/detalher/${id}`);
  }

  async function clonar(id: number) {

    const response = await orcamentoAPI.clonar(id);

    if (response.status === 200) {
      
      history.push(`/orcamentos/cadastro/${response.data.id}`);
      await alerta("", "Operação realizada com sucesso.", "success");

    } else if (response.status !== 200) {

      const texto = tratamentoErro(response.status, response.data.errors);
      await alerta("Alerta", texto?.toString(), "error");

    }

  }

  async function excluir(id: number) {
    const response = await orcamentoAPI.excluir(id);

    if (response.status === 200) {
      const values = [...orcamentos];
      values.splice(
        values.findIndex((value) => value.id === id),
        1
      );
      setOrcamentos(values);

      await alerta("", "Operação realizada com sucesso.", "success");
    } else if (response.status !== 200) {
      const texto = tratamentoErro(response.status, response.data.errors);

      await alerta("Alerta", texto?.toString(), "error");
    }
  }

  async function fechar(id: number, index: number) {
    const data = await orcamentoAPI.fechar(id);

    const values = [...orcamentos];

    values[index].fechado = !values[index].fechado;

    setOrcamentos(values);
  }

  function filtro(e: ChangeEvent<HTMLInputElement>) {
    
    if(e.target.value === "" || e.target.value == null )
    {
      const values = [...orcamentosAll];
      setOrcamentos(values);
    }
    else
    {
      const values = [...orcamentosAll];
      let filtro = values.filter((x) => x.nome.toLowerCase().includes(e.target.value.toLowerCase()));
      setOrcamentos(filtro);
    }

  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
        <h1>Orçamentos</h1>
        <Button variant="dark" size="sm" onClick={novoOrcamento}>
          Novo Orçamento
        </Button>
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
      <Table
        striped
        bordered
        hover
        className="text-center"
        variant="dark"
        responsive="xl"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{formarData(item.data)}</td>
              <td>
                <Badge variant={item.fechado ? "success" : "warning"}>
                  {item.fechado ? "Fechado" : "Não fechado"}
                </Badge>
              </td>
              <td>
                <Button
                  disabled={item.fechado}
                  variant="primary"
                  size="sm"
                  onClick={() => editar(item.id)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => fechar(item.id, index)}
                >
                  Fechar
                </Button>{" "}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => detalhe(item.id)}
                >
                  Visualizar
                </Button>{" "}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => clonar(item.id)}
                >
                  Clonar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => excluir(item.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="loading">
        <Image hidden={!loading} src={window.location.origin + "/loading2.gif"} rounded />
      </div>
    </div>
  );
};

export default Orcamento;
