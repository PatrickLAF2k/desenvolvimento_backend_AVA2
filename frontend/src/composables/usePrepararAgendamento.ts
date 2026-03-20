import { ref, onMounted } from 'vue';
import api from '../services/api';

interface Medico {
    id: number;
    nome: string;
    especialidade: string;
}

interface AgendamentoOcupado {
    id_medico: number;
    data: string;
    hora: string;
}

export function usePrepararAgendamento() {
    const medicos = ref<Medico[]>([]);
    const agendamentosOcupados = ref<AgendamentoOcupado[]>([]);
    const carregando = ref(true);
    const erro = ref<string | null>(null);

    const buscarInformacoes = async () => {
        carregando.value = true;
        try {
            // Chama a rota que preparamos no Back-end
            const { data } = await api.get('/agendamentoPacientestatus');

            medicos.value = data.medicos;
            agendamentosOcupados.value = data.agendamentosOcupados;
        } catch (err) {
            erro.value = "Não foi possível carregar os médicos e horários.";
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    /**
     * Função crucial: Verifica se um horário específico está livre
     * @param idMedico ID do médico selecionado no select
     * @param dataSelecionada Data do VDatePicker (no formato YYYY-MM-DD)
     * @param horaCard A hora do botão no grid (ex: "15:30")
     */
    const isHorarioOcupado = (idMedico: number | null, dataSelecionada: string, horaCard: string) => {
        if (!idMedico) return false;

        return agendamentosOcupados.value.some(agendamento => {
            // O banco pode vir com "15:30:00", então usamos o includes ou slice
            const horaBancoCurta = agendamento.hora.slice(0, 5);

            return agendamento.id_medico === idMedico &&
                agendamento.data === dataSelecionada &&
                horaBancoCurta === horaCard;
        });
    };

    onMounted(buscarInformacoes);

    return {
        medicos,
        carregando,
        erro,
        isHorarioOcupado,
        buscarInformacoes // Caso queira dar um "refresh" manual
    };
}