import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home'
import Produto from '../pages/Produto'
import ProdutoCadastro from '../pages/Produto/Cadastro'
import ProdutoDetalhe from '../pages/Produto/Detalhe'
import Orcamento from '../pages/Orcamento'
import OrcamentoCadastro from '../pages/Orcamento/Cadastro'
import OrcamentoDetalhe from '../pages/Orcamento/Detalhe'
import Login from '../pages/Usuario'
import Relatorio from '../pages/Relatorio'

const OtherRoutes: React.FC = () => {
  return (
    <Switch>
        <Route path="/login" exact component={Login}/>

        <Route path="/" exact component={Home}/>
        <Route path="/produtos" exact component={Produto}/>
        <Route path="/Produtos/cadastro" exact component={ProdutoCadastro}/>
        <Route path="/Produtos/cadastro/:id" exact component={ProdutoCadastro}/>
        <Route path="/Produtos/detalher/:id" exact component={ProdutoDetalhe}/>
  
        <Route path="/orcamentos" exact component={Orcamento}/>
        <Route path="/orcamentos/cadastro" exact component={OrcamentoCadastro}/>
        <Route path="/orcamentos/cadastro/:id" exact component={OrcamentoCadastro}/>
        <Route path="/orcamentos/detalher/:id" exact component={OrcamentoDetalhe}/>

        <Route path="/relatorios" exact component={Relatorio}/>
    </Switch>
  );
};

export default OtherRoutes;
