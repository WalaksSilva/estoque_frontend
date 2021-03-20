import api from './api';


const orcamento = {

    listar: async () => {
        try {
            const response = await api.request.get('orcamentos');
            return response;
        } catch (error) {
            return error;
        }
    },

    criar: async (data : any) => {
        try {
            const response = await api.request.post('orcamentos', data);
            return response;
        } catch (error) {
            return error;
        }
    },

    recuperar: async (id : string) => {
        try {
            const response = await api.request.get(`orcamentos/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    },

    editar: async (id : string, data : any) => {
        try {
            const response = await api.request.put(`orcamentos/${id}`, data);
            return response;
        } catch (error) {
            return error;
        }
    },

    excluir: async (id : number) => {
        try {
            const response = await api.request.delete(`orcamentos/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    },

    fechar: async (id : number) => {
        try {
            const response = await api.request.get(`orcamentos/fechar/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default orcamento;