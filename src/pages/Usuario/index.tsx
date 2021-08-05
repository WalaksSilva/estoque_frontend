import React, { ChangeEvent, useState } from "react";
import { Button, Container, Form, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../service/api";
import { login, getToken } from "../../service/auth";
import usuario from "../../service/usuario";
import "./index.css";
interface ILogin {
  email: string;
  password: string;
  accessToken: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [model, setModel] = useState<ILogin>({
    accessToken: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    setLoading(true);

    e.preventDefault();
    const { data } = await usuario.login(model);

    if(data == undefined)
    {
      setMsg("Usuário inválido!")
      setLoading(false);
    }
    else{

      // setModel(data);
      login(data.accessToken);
      history.push("/");
      setLoading(false);
      window.location.reload();
    }
    // email: "walaks.alves@gmail.com",
    // password: "Br@sil2020",
  }

  function atualizarModel(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setModel({
      ...model,
      [e.target.name]: Number.isNaN(parseInt(e.target.value))
        ? e.target.value
        : parseInt(e.target.value),
    });
  }

  return (
    <div className="container login">
      {/* <button onClick={handleLogin}>Login</button> */}
      <Form onSubmit={handleLogin}>
        {/* <Row> */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Email"
            name="email"
            value={model.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
          />
          <Form.Text className="text-muted">
            {msg}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required={true}
            type="password"
            placeholder="Password"
            name="password"
            value={model.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarModel(e)}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button hidden={loading} variant="primary" type="submit">
          Entrar
        </Button>
        <div>
          <Image hidden={!loading} src={window.location.origin + "/loading2.gif"} rounded />
        </div>
        {/* </Row> */}
      </Form>
    </div>
  );
};

export default Login;
