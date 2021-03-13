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
  quantidade: number
  valor: number;
}

const Detalhe: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [model, setModel] = useState<IOrcamento>({
    id: 0,
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
          {model.orcamentoProdutos.map((item) => (
            <Card.Text>
              {item.quantidade}        ....................{item.valor}
            </Card.Text>
          ))}
          <Card.Subtitle className="mb-2 text-muted">
            {model.total}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detalhe;
