import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Usuario'



const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
};

export default SignRoutes;
