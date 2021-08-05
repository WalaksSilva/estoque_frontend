import api from './api';

const item = {

    excluir: async (id : number) => {
        try {
            const response = await api.request.delete(`itens/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    
}

export default item;