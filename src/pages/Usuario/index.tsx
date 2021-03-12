import React, { useState } from 'react';
import api from '../../service/api';
import { login, getToken } from "../../service/auth";
import usuario from "../../service/usuario";

interface ILogin {
  accessToken : string,
}

const Login: React.FC = () => {

  const [model, setModel] = useState<ILogin>({ accessToken : "" });
  async function handleLogin() {

    const { data } = await usuario.login({
      email: 'walaks.alves@gmail.com',
      password: 'Br@sil2020',
    });
    
    setModel(data);
    login(model.accessToken);    
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
