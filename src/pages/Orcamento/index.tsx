import React, { useState, useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import orcamento from "../../service/orcamento";
import moment from "moment";
import "./index.css";

const Orcamento: React.FC = () => {
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

  const [orcamentos, setOrcamentos] = useState<IOrcamento[]>([]);
  const history = useHistory();

  useEffect(() => {
    carregarOrcamentos();
  }, []);

  async function carregarOrcamentos() {
    const { data } = await orcamento.listar();
    setOrcamentos(data);
  }

  function formarData(data: Date) {
    return moment(data).format("DD/MM/yyyy");
  }

  function novoOrcamento()
  {
    history.push("/orcamentos/cadastro");
  }

  function editar(id : number)
  {
    history.push(`/orcamentos/cadastro/${id}`);
  }

  function detalhe(id : number)
  {
    history.push(`/orcamentos/detalher/${id}`);
  }

  function fechar(id : number)
  {
    alert("Fechar");
  }

  return (
    <div className="container">
      <br />

      <br />
      <div className="orcamento-header">
      <h1>Orçamentos</h1>
          <Button variant="dark" size="sm" onClick={novoOrcamento}>Novo Orçamento</Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center" variant="dark" responsive="xl">
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
          {orcamentos.map((item) => (
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
                <Button variant="primary" size="sm" onClick={() => editar(item.id)}>
                  Editar
                </Button>{" "}
                <Button variant="success" size="sm" onClick={() => fechar(item.id)}>
                  Finalizar
                </Button>{" "}
                <Button variant="info" size="sm" onClick={() => detalhe(item.id)}>
                  Visualizar
                </Button>{" "}
                <Button variant="danger" size="sm">
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orcamento;
