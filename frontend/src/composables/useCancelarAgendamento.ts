import { ref } from 'vue';
import api from '../services/api';

export function useCancelarAgendamento() {
    const isLoading = ref(false);
    const erro = ref<string | null>(null);

    async function cancelarConsultaApi(id: string | number) {
        isLoading.value = true;
        erro.value = null;

        try {
            // Ajustado para a rota correta que você tem no back
            const response = await api.patch(`/cancelarAgendamento/${id}`);
            return { success: true, data: response.data };
        } catch (err: any) {
            erro.value = err.response?.data?.message || "Erro ao cancelar agendamento.";
            return { success: false, message: erro.value };
        } finally {
            isLoading.value = false;
        }
    }

    return {
        cancelarConsultaApi,
        isLoading,
        erro
    };
}