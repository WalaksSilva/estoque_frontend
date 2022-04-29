import api from './api';


const orcamento = {

    listar: async () => {
        try {
            const response = await api.request.get('orcamentos');
            return response;
        } catch (error) {
            return error.response;
        }
    },

    criar: async (data : any) => {
        try {
            const response = await api.request.post('orcamentos', data);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    recuperar: async (id : string) => {
        try {
            const response = await api.request.get(`orcamentos/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    clonar: async (id : number) => {
        try {
            const response = await api.request.get(`orcamentos/clonar/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    editar: async (id : string, data : any) => {
        try {
            const response = await api.request.put(`orcamentos/${id}`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    excluir: async (id : number) => {
        try {
            const response = await api.request.delete(`orcamentos/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    fechar: async (id : number) => {
        try {
            const response = await api.request.get(`orcamentos/fechar/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },
};

export default orcamento;