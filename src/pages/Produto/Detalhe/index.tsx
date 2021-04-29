import React, { useEffect, useState } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router-dom";
import ITipoProduto from "../../../Interface/ITipoProduto";
import produtoAPI from "../../../service/produto";

interface IProduto {
  id: number | undefined;
  nome: string | undefined;
  quantidade: number | undefined;
  valorPago: number | undefined;
  valorVenda: number | undefined;
  tipoMedida: ITipoMedida;
  tipoProduto: ITipoProduto;
}

interface ITipoMedida {
  id: number | undefined;
  nome: string | undefined;
}

const Detalhe: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<IProduto>({
    id: undefined,
    nome: undefined,
    quantidade: undefined,
    valorPago: undefined,
    valorVenda: undefined,
    tipoMedida: {
      id: 0,
      nome: "",
    },
    tipoProduto: {
      id: 0,
      nome: "",
    },
  });

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    const { data } = await produtoAPI.recuperar(id);
    setProduto(data);
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
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <Card.Body>{produto.nome}</Card.Body>
          <ListGroup.Item>
            Tipo de produto:{" "}
            <Badge variant="success">{produto.tipoProduto.nome}</Badge>
          </ListGroup.Item>

          {produto.tipoProduto.id === 1 ? (
            <div>
              <ListGroup.Item>
                Tipo de medida:{" "}
                <Badge variant="success">{produto.tipoMedida.nome}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                Quantidade: <Badge variant="danger">{produto.quantidade}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                Valor pago:{" "}
                <Badge variant="secondary">{produto.valorPago}</Badge>
              </ListGroup.Item>
            </div>
          ) : (
            ""
          )}
          <ListGroup.Item>
            Valor venda: <Badge variant="secondary">{produto.valorVenda}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Detalhe;
