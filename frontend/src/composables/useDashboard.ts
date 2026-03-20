import { ref } from 'vue';
import api from '../services/api';

interface Stats {
    canceladas: number;
    pacientes: number;
    totalAgendamentos: number;
    consultasHoje: number;
}

const stats = ref<Stats>({
    canceladas: 0,
    pacientes: 0,
    totalAgendamentos: 0,
    consultasHoje: 0
});

const isLoadingStats = ref(false);
const erroStats = ref<string | null>(null);

export function useDashboard() {

    async function buscarEstatisticas() {
        isLoadingStats.value = true;
        erroStats.value = null;

        try {
            const response = await api.get('/getStats');
            stats.value = response.data;
        } catch (err: any) {
            erroStats.value = err.response?.data?.message || "Erro ao carregar estatísticas.";
            console.error("Erro Dashboard:", err);
        } finally {
            isLoadingStats.value = false;
        }
    }

    function traduzirDataParaClima(dataConsulta: string) {
        const dadosSalvos = localStorage.getItem('previsao_clima');

        if (!dadosSalvos) return 'Previsão indisponível';

        const listaClima = JSON.parse(dadosSalvos);

        let dataBusca = dataConsulta;
        if (dataConsulta.includes('/')) {
            const [dia, mes, ano] = dataConsulta.split('/');
            dataBusca = `${ano}-${mes}-${dia}`;
        }

        const match = listaClima.find((item: any) => item.dt_txt.includes(dataBusca));

        return match ? match.weather[0].description : 'Céu limpo';
    }

    return {
        stats,
        isLoadingStats,
        erroStats,
        buscarEstatisticas,
        traduzirDataParaClima
    };
}