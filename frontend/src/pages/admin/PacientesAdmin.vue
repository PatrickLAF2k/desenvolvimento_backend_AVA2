<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAuth } from '../../composables/useAuth';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';
import { useStaggerRender } from '../../composables/useStaggerRender';
import { usePerfil } from '../../composables/usePerfil';

const { verificarAcesso } = useAuth();

const { showElements } = useStaggerRender(2, 150);
const busca = ref('');
const { perfil, buscarPerfil } = usePerfil();

const dadosPacientes = ref([
    {
        id: 1,
        nome: 'Roberto Ferreira',
        email: 'robert.houghwout.jackson@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'São Paulo',
        cadastro: '2023-10-01',
    },
    {
        id: 2,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 3,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 4,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 5,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 6,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 7,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 8,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 9,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 10,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 11,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 12,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 13,
        nome: 'Maria Silva',
        email: 'maria.silva@examplepetstore.com',
        telefone: '(11) 98765-4321',
        cidade: 'Rio de Janeiro',
        cadastro: '2023-09-15',
    },
    {
        id: 14,
        nome: 'João Santos',
        email: 'joao.santos@example.com',
        telefone: '(11) 98765-4321',
        cidade: 'Belo Horizonte',
        cadastro: '2023-08-20',
    }


]);

onMounted(() => {
    verificarAcesso();
    buscarPerfil();

});

const pacientesFiltrados = computed(() => {
    const termo = busca.value.toLowerCase();

    return dadosPacientes.value.filter(paciente => {
        return (
            paciente.nome.toLowerCase().includes(termo) ||
            paciente.email.toLowerCase().includes(termo) ||
            paciente.cidade.toLowerCase().includes(termo)
        );
    });
});

</script>

<template>
    <main class="ctnPrincipal">

        <transition name="stagger">
            <div v-if="showElements[0]" class="divCabecarioPage">
                <h2>Gerenciar Pacientes</h2>
                <h3>Lista de pacientes cadastrados </h3>
            </div>
        </transition>


        <transition name="stagger">
            <div v-if="showElements[1]" class="ctnPacientes">

                <div class="divTextopacientes">
                    <div class="titulo-secao">
                        <Icon class="icon" icon="pepicons-print:persons" />
                        <h2> Pacientes ({{ dadosPacientes.length }}) </h2>
                    </div>

                    <div class="search-container">
                        <Icon icon="mdi:magnify" class="search-icon" />
                        <input v-model="busca" type="text" placeholder="Pesquisar por nome, e-mail ou cidade..." />
                    </div>
                </div>

                <div class="ctnTabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Cidade</th>
                                <th>Data de Cadastro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="paciente in pacientesFiltrados" :key="paciente.id">
                                <td>{{ paciente.nome }}</td>
                                <td>{{ paciente.email }}</td>
                                <td>{{ paciente.telefone }}</td>
                                <td>{{ paciente.cidade }}</td>
                                <td>{{ paciente.cadastro }}</td>
                            </tr>
                        </tbody>
                    </table>
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

.ctnPacientes {
    display: flex;
    flex-direction: column;
    height: 90%;
    margin: 3rem auto;
    padding: 2rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: auto;

    .divTextopacientes {
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
    // Container de scroll para telas pequenas

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        min-width: 800px; // Garante que a tabela não "esmague" em telas pequenas

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

                td {
                    padding: 16px;
                    color: #334155;
                    font-size: 0.9rem;
                    vertical-align: middle;

                    // Estilo para o botão de ação
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
                }
            }
        }
    }
}
</style>
