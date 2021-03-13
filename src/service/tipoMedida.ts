import api from './api';


const tipoMedida = {

    listar: async () => {
        try {
            const response = await api.request.get('tipo-medidas');
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default tipoMedida;