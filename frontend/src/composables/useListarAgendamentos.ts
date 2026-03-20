import { ref } from 'vue';
import api from '../services/api';

export function useListarAgendamentos() {
    const isLoading = ref(false);
    const agendamentos = ref<any[]>([]);

    async function buscarAgendamentos() {
        isLoading.value = true;
        try {
            // Ajuste aqui para a sua rota de listagem (ex: /agendamentos/listar)
            const response = await api.get('/ListarAgendamentos');
            agendamentos.value = response.data;
            return { success: true };
        } catch (error) {
            console.error("Erro ao buscar consultas:", error);
            return { success: false };
        } finally {
            isLoading.value = false;
        }
    }

    return {
        agendamentos,
        buscarAgendamentos,
        isLoading
    };
}