import { ref } from 'vue';
import api from '../services/api';

interface PayloadAgendamento {
    id_medico: number;
    data: string; // Espera "DD/MM/YYYY" conforme seu Controller
    hora: string;
    status: string;
    observacao: string;
}

export function useCriarAgendamento() {
    const enviando = ref(false);
    const erro = ref<string | null>(null);

    const realizarAgendamento = async (payload: PayloadAgendamento) => {
        enviando.value = true;
        erro.value = null;

        try {
            const response = await api.post('/agendarConsulta', payload);

            return {
                success: true,
                message: response.data.message || "Agendamento realizado com sucesso!"
            };
        } catch (err: any) {
            const mensagemErro = err.response?.data?.message || "Erro ao processar agendamento.";
            erro.value = mensagemErro;

            return {
                success: false,
                message: mensagemErro
            };
        } finally {
            enviando.value = false;
        }
    };

    return {
        realizarAgendamento,
        enviando,
        erro
    };
}