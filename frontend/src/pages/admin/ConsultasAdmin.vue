<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAuth } from '../../composables/useAuth';
import { onMounted, computed, ref } from 'vue';
import { useStaggerRender } from '../../composables/useStaggerRender';

// Hooks Separados - Verifique se os caminhos estão corretos conforme sua pasta
import { useListarAgendamentos } from '../../composables/useListarAgendamentos';
import { useCancelarAgendamento } from '../../composables/useCancelarAgendamento';

// Componentes de Modal
import ModalCancelar from '../../components/modais/ModalCancelar.vue';
import ModalDetalhes from '../../components/modais/ModalDetalhes.vue';

// Setup dos Hooks
const { verificarAcesso } = useAuth();
const { showElements } = useStaggerRender(2, 150);

// LISTAGEM
const { agendamentos, buscarAgendamentos, isLoading: carregandoLista } = useListarAgendamentos();

// CANCELAMENTO (Ajustado para usar o nome correto da função importada)
const { cancelarConsultaApi, isLoading: statusApi } = useCancelarAgendamento();

// Estado Reativo Local
const busca = ref('');
const mostrarModalCancelar = ref(false);
const mostrarModalDetalhes = ref(false);
const consultaSelecionada = ref<any>(null);

onMounted(async () => {
    verificarAcesso();
    await buscarAgendamentos(); // Busca inicial do banco
});

// Lógica de Estatística
const totalConsultasHoje = computed(() => {
    const hoje = new Date().toISOString().split('T')[0];
    return agendamentos.value.filter(c => c.data === hoje).length;
});

// Filtro de busca
const consultasParaTabela = computed(() => {
    const termo = busca.value.toLowerCase();
    if (!termo) return agendamentos.value;

    return agendamentos.value.filter(c =>
        c.paciente.toLowerCase().includes(termo) ||
        c.medico.toLowerCase().includes(termo)
    );
});


const verDetalhes = (consulta: any) => {
    consultaSelecionada.value = consulta;
    mostrarModalDetalhes.value = true;
};

const abrirModalCancelar = (consulta: any) => {
    consultaSelecionada.value = consulta;
    mostrarModalCancelar.value = true;
};

const confirmarCancelamento = async () => {
    if (!consultaSelecionada.value) return;

    const resultado = await cancelarConsultaApi(consultaSelecionada.value.id);

    if (resultado.success) {
        const item = agendamentos.value.find(c => c.id === consultaSelecionada.value.id);
        if (item) {
            item.status = 'cancelada';
        }
        mostrarModalCancelar.value = false;
    } else {
        alert(resultado.message);
    }
};
</script>

<template>
    <main class="ctnPrincipal">
        <transition name="stagger">
            <div v-if="showElements[0]" class="divCabecarioPage">
                <h2>Gerenciar Consultas</h2>
                <h3>Visualize e gerencie todos os agendamentos do sistema</h3>
            </div>
        </transition>

        <transition name="stagger">
            <div v-if="showElements[1]" class="ctnconsultas">
                <div class="divTextoconsultas">
                    <div class="titulo-secao">
                        <Icon class="icon" icon="pepicons-print:persons" />
                        <h2> Consultas Hoje ({{ totalConsultasHoje }}) </h2>
                    </div>

                    <div class="search-container">
                        <Icon icon="mdi:magnify" class="search-icon" />
                        <input v-model="busca" type="text" placeholder="Pesquisar por Paciente ou Médico..." />
                    </div>
                </div>

                <div class="ctnTabela">
                    <div v-if="carregandoLista" class="loading-state">
                        <Icon icon="eos-icons:loading" /> Carregando agendamentos...
                    </div>

                    <table v-else>
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Médico</th>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="consulta in consultasParaTabela" :key="consulta.id">
                                <td>{{ consulta.paciente }}</td>
                                <td>{{ consulta.medico }}</td>
                                <td>{{ consulta.data }}</td>
                                <td>{{ consulta.hora?.substring(0, 5) }}</td>
                                <td>
                                    <span :class="['status-texto', `status-${consulta.status}`]">
                                        {{ consulta.status }}
                                    </span>
                                </td>
                                <td class="colAcoes">
                                    <button class="btnDetalhes" @click="verDetalhes(consulta)">
                                        Ver Detalhes
                                    </button>

                                    <button v-if="consulta.status !== 'cancelada' && consulta.status !== 'concluida'"
                                        class="btnCancelar" @click="abrirModalCancelar(consulta)">
                                        Cancelar
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="consultasParaTabela.length === 0">
                                <td colspan="6" class="tabela-vazia">Nenhum agendamento encontrado.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </transition>

        <Teleport to="body">
            <ModalCancelar v-if="mostrarModalCancelar" :nomePaciente="consultaSelecionada?.paciente"
                :loading="statusApi" @fechar="mostrarModalCancelar = false" @confirmar="confirmarCancelamento" />

            <ModalDetalhes v-if="mostrarModalDetalhes" :consulta="consultaSelecionada"
                @fechar="mostrarModalDetalhes = false" />
        </Teleport>
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

.ctnconsultas {
    display: flex;
    flex-direction: column;
    height: 90%;
    margin: 3rem auto;
    padding: 2rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: auto;

    .divTextoconsultas {
        display: flex;
        align-items: center;

        gap: 5rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem 0;

        .titulo-secao {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .icon {
                color: $primary;
                font-size: 1.5rem;
            }

            h2 {
                font-size: 1.1rem;
                font-weight: 600;
                color: #334155;
                white-space: nowrap;
            }
        }

        .search-container {
            position: relative;
            flex-grow: 1;
            max-width: 400px;

            .search-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #94a3b8;
                font-size: 1.2rem;
                pointer-events: none;
            }

            input {
                width: 100%;
                padding: 10px 12px 10px 40px; // Padding extra na esquerda para o ícone
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                background-color: white;
                font-size: 0.9rem;
                color: #334155;
                outline: none;
                transition: all 0.2s ease-in-out;

                &::placeholder {
                    color: #94a3b8;
                }

                &:focus {
                    border-color: $primary;
                    box-shadow: 0 0 0 3px rgba($primary, 0.1); // Efeito de brilho suave
                    background-color: #fff;
                }
            }
        }
    }



}

.ctnTabela {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    overflow: auto;

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        min-width: 800px;

        thead {
            background-color: #f8fafc;

            th {
                padding: 16px;
                color: #64748b;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                border-bottom: 1px solid #e2e8f0;
            }
        }

        tbody {
            tr {
                border-bottom: 1px solid #f1f5f9;
                transition: background-color 0.2s ease;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background-color: #f1f5f9;
                }

                .colAcoes {
                    display: flex;
                    justify-content: space-between;
                }

                td {
                    padding: 16px;
                    color: #334155;
                    font-size: 0.9rem;
                    vertical-align: middle;



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
                }
            }
        }
    }
}
</style>
