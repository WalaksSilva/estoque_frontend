import api from './api';

interface ILogin {
    accessToken : string,
}

const produto = {

    login: async (data : any) => {
        try {
            const response = await api.request.post<ILogin>('usuarios/entrar', data);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    criar: async (data : any) => {
        try {
            debugger;
            const response = await api.request.post('produtos/nova-conta', data);
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default produto;