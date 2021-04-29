import api from './api';


const produto = {

    listar: async () => {
        try {
            const response = await api.request.get('produtos');
            return response;
        } catch (error) {
            return error.response;
        }
    },

    listarTiposProdutos: async () => {
        try {
            const response = await api.request.get('produtos/tipos');
            return response;
        } catch (error) {
            return error.response;
        }
    },

    criar: async (data : any) => {
        try {
            debugger;
            const response = await api.request.post('produtos', data);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    recuperar: async (id : string) => {
        try {
            const response = await api.request.get(`produtos/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    editar: async (id : string, data : any) => {
        try {
            const response = await api.request.put(`produtos/${id}`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    excluir: async (id : string) => {
        try {
            const response = await api.request.delete(`produtos/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },
};

export default produto;