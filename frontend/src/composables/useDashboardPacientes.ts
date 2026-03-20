import { ref, onMounted } from 'vue';
import api from '../services/api';

export function useDashboardPacientes() {
   
    const dadosDashboard = ref({
        nome: '',
        consultasConcluidas: 0,
        proximasConsultas: [] as any[]
    });

    const carregando = ref(true);

    const buscarDados = async () => {
        try {
            const { data } = await api.get('getStatsPaciente');
            dadosDashboard.value = data;
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
        } finally {
            carregando.value = false;
        }
    };

    onMounted(buscarDados);

    return {
        ...dadosDashboard.value, 
        dadosDashboard, 
        carregando,
        buscarDados
    };
}