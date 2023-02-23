import React, { useEffect, useState } from "react";
import { Badge, Button, Card, ListGroup, Table, Image} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import swal from "sweetalert";
import { tratamentoErro } from "../../Erro/tratamento";
import orcamentoAPI from "../../service/orcamento";
import IOrcamento from "../../Interface/IOrcamento";


const Relatorio: React.FC = () => {
  const history = useHistory();
  const [orcamentos, setOrcamentos] = useState<IOrcamento[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    carregarOrcamentos();
  }, []);

  async function carregarOrcamentos() {
    setLoading(true);
    const response = await orcamentoAPI.listar();

    if (response.status === 200) {
      setOrcamentos(response.data);
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

  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <br />
      <br />
      <Table striped bordered hover className="margin-top-70">
        <thead>
          <tr>
            <th>Orçamentos</th>
            <th>Orçamentos fechados</th>
            <th>Valor total de orçamentos</th>
            <th>Valor total de orçamentos fechados</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orcamentos.length}</td>
            <td>{orcamentos.filter((x) => x.fechado === true).length}</td>
            <td>{orcamentos.reduce((a, b) => +a + +b.total, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
            <td>{orcamentos.filter((x) => x.fechado === true).reduce((a, b) => +a + +b.total, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
          </tr>
        </tbody>
      </Table>
      <div className="loading">
        <Image hidden={!loading} src={window.location.origin + "/loading2.gif"} rounded />
      </div>
    </div>
  );
};

export default Relatorio;
