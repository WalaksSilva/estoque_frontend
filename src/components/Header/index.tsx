import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Image } from "react-bootstrap";

import {
    Link, useHistory
} from "react-router-dom";
import { isAuthenticated, logout } from "../../service/auth";

const Header: React.FC = () => {
  const [disable, setDisable] = useState(false);
  

  useEffect(() => {
    const logado = isAuthenticated();
    setDisable(logado);
  }, []);

  const history = useHistory();

  async function Sair() {
    logout();
    setDisable(false);
    history.push(`/login`);
  }

  return (
    <Navbar hidden={!disable}  bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" as={Link} to="/orcamentos"><Image className="logo" src={window.location.origin + "/logo1.1.png"} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="nav-link" as={Link} to="/produtos" >Produtos</Nav.Item>
          <Nav.Item className="nav-link" as={Link} to="/orcamentos">Orçamentos</Nav.Item>
          <Nav.Item className="nav-link" as={Link} to="/relatorios">Relatórios</Nav.Item>
        </Nav>
          <Button className="float-right" variant="danger" size="sm" onClick={Sair}>Sair</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
