import api from './api';


const produto = {

    listar: async () => {
        try {
            const response = await api.request.get('produtos');
            return response;
        } catch (error) {
            return error;
        }
    },

    criar: async (data : any) => {
        try {
            debugger;
            const response = await api.request.post('produtos', data);
            return response;
        } catch (error) {
            return error;
        }
    },

    recuperar: async (id : string) => {
        try {
            const response = await api.request.get(`produtos/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    },

    editar: async (id : string, data : any) => {
        try {
            const response = await api.request.put(`produtos/${id}`, data);
            return response;
        } catch (error) {
            return error;
        }
    },

    excluir: async (id : string) => {
        try {
            const response = await api.request.delete(`produtos/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default produto;