import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import orcamento from "../../../service/orcamento";

interface IOrcamento {
  id: number;
  nome: string;
  total: number;
  orcamentoProdutos: IOrcamentoProduto[];
}

interface IOrcamentoProduto {
  valor: number;
}

const Detalhe: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [model, setModel] = useState<IOrcamento>({
    id : 0,
    nome: "",
    total: 0,
    orcamentoProdutos: [],
  });

  useEffect(() => {
      recuperarOrcamento();
  }, [id]);

  async function recuperarOrcamento() {
    const { data } = await orcamento.recuperar(id);

    setModel(data);
  }

  function back() {
    history.goBack();
  }
  return (
    <div className="container">
      <br />
      <div className="orcamento-header">
        <h1>Detalhes</h1>
        <Button onClick={back} variant="dark" size="sm">
          Voltar
        </Button>
      </div>

      <br />
      <Card>
        <Card.Body>
          <Card.Title>{model.nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detalhe;
