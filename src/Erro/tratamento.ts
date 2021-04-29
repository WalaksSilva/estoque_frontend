export const tratamentoErro = (status : number, mensagem : string[]) => {
    if(status === 401)
    {
      window.location.href = `http://localhost:3000/login`;
      return null;
    }
    else if(status === 400 || status === 500)
    {
      console.log("Texto", mensagem[0])
  
      return "Erro inesperado, tente novamente ou grite o Walaks!"
    }
  };