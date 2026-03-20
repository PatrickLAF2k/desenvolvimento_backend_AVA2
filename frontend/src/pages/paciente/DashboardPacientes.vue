<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useStaggerRender } from '../../composables/useStaggerRender';
import { useDashboard } from '../../composables/useDashboard';
import { useDashboardPacientes } from '../../composables/useDashboardPacientes';
import { useCancelarAgendamento } from '../../composables/useCancelarAgendamento';
import ModalCancelar from '../../components/modais/ModalCancelar.vue';

// --- HOOKS DE UTILITÁRIOS ---
const { showElements } = useStaggerRender(4, 150);
const { verificarAcesso } = useAuth();
const { traduzirDataParaClima } = useDashboard();

// --- HOOKS DE DADOS (API) ---
const { dadosDashboard, carregando, buscarDados } = useDashboardPacientes();
const { cancelarConsultaApi, isLoading: statusApi } = useCancelarAgendamento();

// --- ESTADOS LOCAIS ---
const mostrarModalCancelar = ref(false);
const consultaSelecionada = ref<any>(null);

onMounted(() => {
    verificarAcesso();
});

// --- LÓGICA DE CANCELAMENTO ---
const abrirModalCancelar = (consulta: any) => {
    consultaSelecionada.value = consulta;
    mostrarModalCancelar.value = true;
};

const confirmarCancelamento = async () => {
    if (!consultaSelecionada.value) return;

    // Chama a API de cancelamento
    const resultado = await cancelarConsultaApi(consultaSelecionada.value.id);

    if (resultado.success) {
        // Atualiza os dados da tela (contadores e lista) buscando do back novamente
        await buscarDados();
        mostrarModalCancelar.value = false;
        consultaSelecionada.value = null;
    } else {
        // Caso ocorra erro no back-end
        alert(resultado.message || "Erro ao cancelar consulta.");
    }
};

// --- LÓGICA DE CLIMA ---
const getIconeClima = (data: string) => {
    const desc = traduzirDataParaClima(data).toLowerCase();
    if (desc.includes('chuva')) return 'solar:cloud-rain-bold-duotone';
    if (desc.includes('nuvem') || desc.includes('nublado')) return 'solar:clouds-bold-duotone';
    if (desc.includes('limpo') || desc.includes('sol')) return 'solar:sun-bold-duotone';
    return 'solar:cloud-sun-2-bold-duotone';
};
</script>

<template>
    <main class="ctnPrincipal" v-if="!carregando">

        <transition name="stagger">
            <div class="divCabecario" v-if="showElements[0]">
                <div class="divCabecarioTextos">
                    <h2>{{ dadosDashboard.nome }}
                        <span>
                            <Icon icon="twemoji:waving-hand" />
                        </span>
                    </h2>
                    <h3>Veja o resumo das suas consultas</h3>
                </div>

                <router-link to="/agendamentosPaciente">
                    <div class="btnNovaConsulta">
                        <h2>
                            <span class="icon">
                                <Icon icon="solar:calendar-add-bold-duotone" />
                            </span>
                            Nova Consulta
                        </h2>
                    </div>
                </router-link>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[1]" class="ctnCards">
                <div class="cards">
                    <Icon class="iconConsultas" icon="oui:token-date" />
                    <div>
                        <h2>{{dadosDashboard.proximasConsultas.filter(c => c.status !== 'cancelada').length}}</h2>
                        <h3>Consultas Ativas</h3>
                    </div>
                </div>

                <div class="cards">
                    <Icon class="iconProximas" icon="mdi:calendar-check-outline" />
                    <div>
                        <h2>{{ dadosDashboard.consultasConcluidas }}</h2>
                        <h3>Consultas Concluídas</h3>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[2]" class="ctnConsultasHoje">
                <div class="divTextoConsultas">
                    <h2 class="txtProximosAtendimentos">Próximas Consultas</h2>
                </div>

                <div class="divConsultas" v-for="consulta in dadosDashboard.proximasConsultas" :key="consulta.id">
                    <div class="txtCardConsultas">
                        <h2 class="nomePaciente">{{ consulta.nome }}</h2>
                        <h3 class="dadosMedico">
                            {{ consulta.especialidade }} - {{ consulta.data }} às {{ consulta.horario }}
                            <span class="clima-info">
                                <Icon :icon="getIconeClima(consulta.data)" class="icon-clima" />
                                {{ traduzirDataParaClima(consulta.data) }}
                            </span>
                        </h3>
                    </div>

                    <div class="divStatus">
                        <h2 :class="['status-texto', `status-${consulta.status}`]">
                            {{ consulta.status }}
                        </h2>

                        <button v-if="consulta.status !== 'cancelada' && consulta.status !== 'concluida'"
                            class="btnCancelar" @click="abrirModalCancelar(consulta)">
                            Cancelar
                        </button>
                    </div>
                </div>

                <div v-if="dadosDashboard.proximasConsultas.length === 0" class="sem-consultas">
                    <p>Você não possui consultas agendadas.</p>
                </div>
            </div>
        </transition>

        <Teleport to="body">
            <ModalCancelar v-if="mostrarModalCancelar" :nomePaciente="consultaSelecionada?.nome" :loading="statusApi"
                @fechar="mostrarModalCancelar = false" @confirmar="confirmarCancelamento" />
        </Teleport>
    </main>

    <div v-else class="loader-principal">
        <Icon icon="svg-spinners:ring-resize" />
        <p>Sincronizando sua agenda...</p>
    </div>
</template>

<style lang="scss" scoped>
@use "../../global.scss" as *;

.ctnPrincipal {
    width: 85vw;
    height: 100vh;
    padding: 3rem;


}

.divCabecario {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    .divCabecarioTextos {
        display: flex;
        flex-direction: column;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
        }

        h3 {
            font-size: 1rem;
            font-weight: 500;
            color: #6c7c93;
        }
    }

    .btnNovaConsulta {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: $secondary;
        border-radius: 8px;

        @include btnHoverEffect;

        h2 {
            font-size: 0.8rem;
            color: white;
        }
    }
}

.ctnCards {
    gap: 1rem;
    display: flex;
    align-items: center;
    margin: 3rem auto;

    .cards {
        width: 20%;
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;

        h3 {
            font-size: 0.8rem;
            font-weight: 500;
            color: $text-light;
        }

        .iconConsultas {
            font-size: 2rem;
            color: #0317fc;
            background-color: #0318fc2d;
            border-radius: 5px;
        }

        .iconProximas {
            font-size: 2rem;
            color: #17a305;
            background-color: #17a3052c;
            border-radius: 5px;
        }

        .iconCanceladas {
            font-size: 2rem;
            color: #a30505;
            background-color: #a3050531;
            border-radius: 5px;
        }

        .iconPacientes {
            font-size: 2rem;
            color: #ff8800;
            background-color: #ff880046;
            border-radius: 5px;
        }

        .iconConcluidas {
            font-size: 2rem;
            color: #ff00b3;
            background-color: #ff00b32a;
            border-radius: 5px;
        }
    }
}


.ctnConsultasHoje {
    display: flex;
    flex-direction: column;
    height: 70%;
    margin-bottom: 2rem;
    padding: 2rem;
    gap: 1rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: auto;



    .txtProximosAtendimentos {
        font-size: 1rem;
    }

    .divTextoConsultas {
        display: flex;
        justify-content: space-between;
        align-items: center;


        a {
            display: flex;
            justify-content: center;
            padding: 0.2rem;
            border-radius: 8px;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: $text-dark;
            @include btnHoverEffect;


        }

    }

    .divConsultas {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        @include bordas;

        .txtCardConsultas {
            display: flex;
            flex-direction: column;
            padding: 0.5rem;


            .nomePaciente {
                font-weight: 500;
                font-size: 1rem;
            }

            .dadosMedico {
                font-size: 0.8rem;
                color: $text-light;
                font-weight: 300;
            }
        }

    }


}

button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    background-color: #3b82f6; // Azul moderno
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
    }
}

.btnCancelar {
    background-color: #f70d0d;

    &:hover {
        background-color: #8d1010;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
}

.divStatus {
    display: flex;
    gap: 1rem;
}
</style>
