import React from 'react'
import { Route, Switch } from 'react-router-dom';

import { isAuthenticated } from "../service/auth";
import OtherRoutes from './OtherRoutes';
import SignRoutes from './SignRoutes';


const Routes : React.FC = ()  => {
  return isAuthenticated() ? <OtherRoutes /> : <SignRoutes />;
}

export default Routes
