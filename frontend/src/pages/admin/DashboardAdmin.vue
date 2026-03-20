<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useStaggerRender } from '../../composables/useStaggerRender';
import { useDashboard } from '../../composables/useDashboard';

const { showElements } = useStaggerRender(4, 150);
const { verificarAcesso } = useAuth();
const { stats, buscarEstatisticas, traduzirDataParaClima } = useDashboard();

onMounted(async () => {
    verificarAcesso();
    await buscarEstatisticas();
});

const getIconeClima = (data: string) => {
    const desc = traduzirDataParaClima(data).toLowerCase();
    if (desc.includes('chuva')) return 'solar:cloud-rain-bold-duotone';
    if (desc.includes('nuvem') || desc.includes('nublado')) return 'solar:clouds-bold-duotone';
    if (desc.includes('limpo') || desc.includes('sol')) return 'solar:sun-bold-duotone';
    return 'solar:cloud-sun-2-bold-duotone';
};

const dadosMocados = [
    {
        id: 1,
        nome: 'Roberto Ferreira',
        medico: 'Dr. Carlos Mendes',
        especialidade: 'Cardiologia',
        horario: '15:00',
        data: '19/03/2026',
        status: 'agendada'
    },
    {
        id: 2,
        nome: 'Ana Souza',
        medico: 'Dra. Marina Silva',
        especialidade: 'Dermatologia',
        horario: '16:30',
        data: '20/03/2026',
        status: 'cancelada'
    },
    {
        id: 3,
        nome: 'Carlos Lima',
        medico: 'Dr. Ricardo Paz',
        especialidade: 'Ortopedia',
        horario: '17:00',
        data: '21/03/2026',
        status: 'confirmada'
    }
];
</script>

<template>
    <main class="ctnPrincipal">

        <transition name="stagger">
            <div v-if="showElements[0]" class="divCabecarioPage">
                <h2>Painel Administrativo</h2>
                <h3>Visão geral da clínica</h3>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[1]" class="ctnCards">
                <div class="cards">
                    <Icon class="iconConsultas" icon="oui:token-date" />
                    <div>
                        <h2>{{ stats.consultasHoje }}</h2>
                        <h3>Consultas Hoje</h3>
                    </div>
                </div>

                <div class="cards">
                    <Icon class="iconPacientes" icon="pepicons-print:persons" />
                    <div>
                        <h2>{{ stats.pacientes }}</h2>
                        <h3>Pacientes</h3>
                    </div>
                </div>

                <div class="cards">
                    <Icon class="iconCanceladas" icon="ph:calendar-x" />
                    <div>
                        <h2>{{ stats.canceladas }}</h2>
                        <h3>Canceladas</h3>
                    </div>
                </div>

                <div class="cards">
                    <Icon class="iconProximas" icon="mdi:calendar-check-outline" />
                    <div>
                        <h2>{{ stats.totalAgendamentos }}</h2>
                        <h3>Total Ativos</h3>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[2]" class="ctnAcessoRapido">
                <h2>Acesso Rápido</h2>
                <div class="divAcessoRapido">
                    <router-link to="/consultasAdmin" class="btnAcessoRapido">
                        Gerenciar Consultas
                        <Icon icon="weui:arrow-filled" />
                    </router-link>
                    <router-link to="/pacientesAdmin" class="btnAcessoRapido">
                        Gerenciar Pacientes
                        <Icon icon="weui:arrow-filled" />
                    </router-link>
                </div>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[3]" class="ctnConsultasHoje">

                <div class="divTextoConsultas">
                    <h2 class="txtProximosAtendimentos">Próximos Atendimentos</h2>
                    <router-link to="/consultasAdmin">Ver todas
                        <Icon icon="weui:arrow-filled" />
                    </router-link>
                </div>

                <div class="divConsultas" v-for="consulta in dadosMocados" :key="consulta.id">
                    <div class="txtCardConsultas">
                        <h2 class="nomePaciente">{{ consulta.nome }}</h2>
                        <h3 class="nomeMedico">
                            {{ consulta.medico }} - {{ consulta.especialidade }} - {{ consulta.data }} às {{
                                consulta.horario }}
                            <span class="clima-info">
                                <Icon :icon="getIconeClima(consulta.data)" class="icon-clima" />
                                {{ traduzirDataParaClima(consulta.data) }}
                            </span>
                        </h3>
                    </div>

                    <h2 class="status-texto" :class="`status-${consulta.status}`">
                        {{ consulta.status }}
                    </h2>
                </div>
            </div>
        </transition>
    </main>
</template>

<style lang="scss" scoped>
@use "../../global.scss" as *;

.ctnPrincipal {
    width: 85vw;
    height: 100vh;
    padding: 3rem;


}

.divCabecarioPage {
    display: flex;
    flex-direction: column;
    width: 20%;
    gap: 0.5rem;

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

.ctnCards {
    gap: 1rem;
    display: flex;
    justify-content: space-between;
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

.ctnAcessoRapido {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    padding: 2rem;
    gap: 1rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;

    h2 {
        font-size: 1rem;
    }

    .divAcessoRapido {
        display: flex;
        justify-content: space-between;
        border-radius: 8px;

        .btnAcessoRapido {
            display: flex;
            padding: 0.5rem 1rem;
            justify-content: space-between;
            align-items: center;
            width: 49%;
            color: black;
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-weight: 600;
            @include btnHoverEffect;
        }
    }
}

.ctnConsultasHoje {
    display: flex;
    flex-direction: column;
    height: 50%;
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

            .nomeMedico {
                font-size: 0.8rem;
                color: $text-light;
                font-weight: 300;
            }
        }

    }


}
</style>
