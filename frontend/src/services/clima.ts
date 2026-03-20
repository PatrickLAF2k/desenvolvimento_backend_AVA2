// services/clima.ts
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const CIDADE = 'Rio de Janeiro,BR';

export const buscarPrevisaoCompleta = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CIDADE}&appid=${API_KEY}&lang=pt_br&units=metric`
        );
        return response.data.list; // Retorna o array de previsões
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        return []; // Retorna vazio se der erro para não quebrar o app
    }
};