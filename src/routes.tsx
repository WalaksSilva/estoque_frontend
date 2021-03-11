import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Produto from './pages/Produto'
import Orcamento from './pages/Orcamento'
import OrcamentoCadastro from './pages/Orcamento/Cadastro'
import OrcamentoDetalhe from './pages/Orcamento/Detalhe'

const Routes : React.FC = ()  => {
  return (
    <Switch>            
        <Route path="/" exact component={Home}/>
        <Route path="/Produtos" exact component={Produto}/>
        <Route path="/orcamentos" exact component={Orcamento}/>
        <Route path="/orcamentos/cadastro" exact component={OrcamentoCadastro}/>
        <Route path="/orcamentos/cadastro/:id" exact component={OrcamentoCadastro}/>
        <Route path="/orcamentos/detalher/:id" exact component={OrcamentoDetalhe}/>
    </Switch>
  )
}

export default Routes
