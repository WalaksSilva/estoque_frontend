import api from './api';

const area = {

    excluir: async (id : number) => {
        try {
            const response = await api.request.delete(`areas/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    
}

export default area;