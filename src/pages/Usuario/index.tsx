import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import api from "../../service/api";
import { login, getToken } from "../../service/auth";
import usuario from "../../service/usuario";
import "./index.css";
interface ILogin {
  accessToken: string;
}

const Login: React.FC = () => {
  const [model, setModel] = useState<ILogin>({ accessToken: "" });
  async function handleLogin() {
    const { data } = await usuario.login({
      email: "walaks.alves@gmail.com",
      password: "Br@sil2020",
    });

    setModel(data);
    login(model.accessToken);
  }

  return (
    <div className="container login">
      <button onClick={handleLogin}>Login</button>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
