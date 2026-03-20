<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useStaggerRender } from '../../composables/useStaggerRender';
import { useDashboard } from '../../composables/useDashboard';

// Novos Hooks
import { usePrepararAgendamento } from '../../composables/usePrepararAgendamento';
import { useCriarAgendamento } from '../../composables/useCriarAgendamento';

const router = useRouter();
const { showElements } = useStaggerRender(4, 150);
const { verificarAcesso } = useAuth();
const { buscarEstatisticas } = useDashboard();

// Estados do formulário
const minhaData = ref(new Date());
const horarioSelecionado = ref<string | null>(null);
const medicoSelecionado = ref<any>(null);
const observacoes = ref('');

// Injeção dos Hooks de API
const { medicos, isHorarioOcupado, carregando } = usePrepararAgendamento();
const { realizarAgendamento, enviando } = useCriarAgendamento();

onMounted(async () => {
    verificarAcesso();
    await buscarEstatisticas();
});

// Formata a data para o padrão do banco (YYYY-MM-DD) para a verificação
const dataFormatadaISO = computed(() => {
    if (!minhaData.value) return '';
    // Evita o bug de fuso horário do toISOString() no Brasil (GMT-3)
    const ano = minhaData.value.getFullYear();
    const mes = String(minhaData.value.getMonth() + 1).padStart(2, '0');
    const dia = String(minhaData.value.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
});

// Lista de horários disponíveis no sistema
const listaHorarios = computed(() => {
    const horarios = [];
    for (let h = 7; h <= 12; h++) {
        horarios.push(`${h.toString().padStart(2, '0')}:00`);
        if (h < 12) horarios.push(`${h.toString().padStart(2, '0')}:30`);
    }
    for (let h = 14; h <= 20; h++) {
        horarios.push(`${h.toString().padStart(2, '0')}:00`);
        if (h < 20) horarios.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return horarios;
});

const selecionarHorario = (hora: string) => {
    // 1. Pegamos o ID de forma segura
    const idMedico = medicoSelecionado.value?.id;

    // 2. Se não houver médico selecionado, paramos a execução aqui
    // Isso garante para o TypeScript que, abaixo desta linha, o ID é um NUMBER
    if (!idMedico) {
        alert("Por favor, selecione um médico antes de escolher o horário.");
        return;
    }

    // 3. Agora passamos o idMedico (que o TS já sabe que existe)
    if (!isHorarioOcupado(idMedico, dataFormatadaISO.value, hora)) {
        horarioSelecionado.value = hora;
    }
};

const finalizarAgendamento = async () => {
    if (!medicoSelecionado.value || !horarioSelecionado.value) {
        alert("Por favor, selecione um médico e um horário disponível.");
        return;
    }

    // Prepara o payload para o Back-end
    // Nota: enviamos a data como DD/MM/YYYY pois seu controller usa .split("/")
    const dia = String(minhaData.value.getDate()).padStart(2, '0');
    const mes = String(minhaData.value.getMonth() + 1).padStart(2, '0');
    const ano = minhaData.value.getFullYear();

    const payload = {
        id_medico: medicoSelecionado.value.id,
        data: `${dia}/${mes}/${ano}`,
        hora: horarioSelecionado.value,
        status: 'agendada',
        observacao: observacoes.value
    };

    const resultado = await realizarAgendamento(payload);

    if (resultado.success) {
        alert("Consulta agendada com sucesso!");
        router.push('/dashboardPaciente');
    } else {
        alert(resultado.message || "Erro ao realizar agendamento.");
    }
};
</script>

<template>
    <main class="ctnPrincipal" v-if="!carregando">
        <transition name="stagger">
            <div v-if="showElements[0]" class="divCabecarioPage">
                <h2>Agendar Consulta <span>
                        <Icon icon="twemoji:waving-hand" />
                    </span></h2>
                <h3>Escolha a data, horário e médico para agendar uma consulta</h3>
            </div>
        </transition>

        <div class="gridContainer">
            <section class="colunaEsquerda">
                <transition name="stagger">
                    <div v-if="showElements[1]" class="secaoDatas">
                        <h2>
                            <span>
                                <Icon class="icon" icon="solar:calendar-add-bold-duotone" />
                            </span>
                            Escolha uma data
                        </h2>
                        <VDatePicker v-model="minhaData" borderless transparent />
                    </div>
                </transition>

                <transition name="stagger">
                    <div v-if="showElements[2]" class="secaoHorarios">
                        <h2 class="titulo-horario">
                            <span class="icon-bg">
                                <Icon icon="iconamoon:clock-duotone" />
                            </span>
                            Horários disponíveis
                        </h2>
                        <div class="grid-horarios">
                            <button v-for="hora in listaHorarios" :key="hora" type="button"
                                :disabled="!medicoSelecionado || isHorarioOcupado(medicoSelecionado.id, dataFormatadaISO, hora)" :class="[
                                    'card-hora',
                                    {
                                        'selecionado': horarioSelecionado === hora,
                                        'ocupado': medicoSelecionado && isHorarioOcupado(medicoSelecionado.id, dataFormatadaISO, hora)
                                    }
                                ]" @click="selecionarHorario(hora)">
                                {{ hora }}
                            </button>
                        </div>
                    </div>
                </transition>
            </section>

            <section class="colunaDireita">
                <transition name="stagger">
                    <div v-if="showElements[1]" class="secaoMedicos">
                        <h2 class="txtMedio">
                            <span>
                                <Icon icon="fluent-mdl2:medical" />
                            </span>
                            Escolha um médico
                        </h2>

                        <div class="select-wrapper">
                            <Icon icon="solar:user-speak-bold-duotone" class="input-icon" />
                            <select v-model="medicoSelecionado" class="select-clinica">
                                <option :value="null" disabled selected>Selecione um profissional...</option>
                                <option v-for="medico in medicos" :key="medico.id" :value="medico">
                                    {{ medico.nome }} - {{ medico.especialidade }}
                                </option>
                            </select>
                            <Icon icon="solar:alt-arrow-down-linear" class="arrow-icon" />
                        </div>
                    </div>
                </transition>

                <transition name="stagger">
                    <div v-if="showElements[3]" class="ctnObservacoes">
                        <h2 class="txtObservacoes">
                            <span>
                                <Icon icon="icon-park-twotone:doc-add" />
                            </span>
                            Observações
                        </h2>
                        <textarea v-model="observacoes" placeholder="Caso tenha alguma recomendação específica..."
                            class="input-observacao"></textarea>
                    </div>
                </transition>

                <transition name="stagger">
                    <button v-if="showElements[3]" class="btnFinalizar" :disabled="enviando" @click="finalizarAgendamento">
                        <template v-if="!enviando">
                            Confirmar Agendamento
                            <Icon icon="solar:check-read-bold" />
                        </template>
                        <template v-else>
                            Processando...
                            <Icon icon="svg-spinners:ring-resize" />
                        </template>
                    </button>
                </transition>
            </section>
        </div>
    </main>

    <div v-else class="loader-principal">
        <Icon icon="svg-spinners:ring-resize" />
        <p>Carregando médicos e horários...</p>
    </div>
</template>

<style lang="scss" scoped>
@use "../../global.scss" as *;

.ctnPrincipal {
    width: 85vw;
    height: 100vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
}

.gridContainer {
    display: grid;
    grid-template-columns: 1fr 1fr; // Duas colunas iguais
    gap: 5rem; // Espaço largo entre as duas metades
    align-items: start;
}

h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.3rem;
    color: #334155;
    margin-bottom: 1.5rem;

    span,
    .icon-bg {
        display: flex;
        padding: 10px;
        background: #eff6ff;
        color: #3b82f6;
        border-radius: 12px;
        font-size: 1.4rem;
    }
}

.colunaEsquerda,
.colunaDireita {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.secaoDatas :deep(.vc-container) {
    border: 2px solid #f1f5f9;
    border-radius: 20px;
    width: 100%;
    @include bordas;
    background: white;
}

/* Grid de Horas */
.grid-horarios {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
    gap: 10px;
    @include bordas;
    background: white;
    padding: 1rem;
}

.card-hora {
    padding: 12px;
    border-radius: 10px;
    border: 2px solid #f1f5f9;
    background: white;
    font-weight: 600;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        border-color: #3b82f6;
        background: #eff6ff;
    }

    &.selecionado {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
        box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
    }
}

.select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .input-icon {
        position: absolute;
        left: 15px;
        font-size: 1.4rem;
        color: #3b82f6;
        pointer-events: none;
    }

    .arrow-icon {
        position: absolute;
        right: 15px;
        font-size: 1rem;
        color: #94a3b8;
        pointer-events: none;
    }
}

.select-clinica {
    width: 100%;
    padding: 15px 45px;
    border-radius: 15px;
    border: 2px solid #e2e8f0;
    background: white;
    font-family: inherit;
    font-size: 1rem;
    color: #1e293b;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    option {
        padding: 10px;
        background: white;
        color: #1e293b;
    }
}

.card-hora.ocupado {
    background-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
    text-decoration: line-through;
    border: 1px dashed #cbd5e1;

    &:hover {
        background-color: #f1f5f9;
        transform: none;
    }
}

.loader-principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    gap: 15px;
    color: #3b82f6;

    svg {
        font-size: 3rem;
    }
}


/* Observações */
.input-observacao {
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border-radius: 15px;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    resize: none;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        background: white;
    }
}

/* BOTÃO FINALIZAR */
.btnFinalizar {
    margin-top: 1rem;
    background: #3b82f6;
    color: white;
    padding: 1.2rem;
    border-radius: 15px;
    font-weight: 700;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.3s;

    &:hover {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
    }
}

/* Transições */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>