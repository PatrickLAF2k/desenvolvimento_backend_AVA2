<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <main class="ctnPrincipal">
        <h1>CONSULTAS</h1>

        <!-- <div class="divCabecarioPage">
            <h2>Painel Administrativo</h2>
            <h3>Visão geral da clínica </h3>

        </div>

        <div class="ctnCards">

            <div class="cards">
                <Icon class="iconConsultas" icon="oui:token-date" />
                <div>
                    <h2>3</h2>
                    <h3>Consultas Hoje</h3>
                </div>
            </div>

            <div class="cards">
                <Icon class="iconProximas" icon="mdi:calendar-check-outline" />
                <div>
                    <h2>5</h2>
                    <h3>Próximas</h3>
                </div>
            </div>

            <div class="cards">
                <Icon class="iconCanceladas" icon="ph:calendar-x" />
                <div>
                    <h2>5</h2>
                    <h3>Canceladas</h3>
                </div>
            </div>

            <div class="cards">
                <Icon class="iconPacientes" icon="pepicons-print:persons" />
                <div>
                    <h2>5</h2>
                    <h3>Pacientes</h3>
                </div>
            </div>

            <div class="cards">
                <Icon class="iconConcluidas" icon="material-symbols-light:stethoscope" />
                <div>
                    <h2>5</h2>
                    <h3>Concluidas</h3>
                </div>
            </div>
        </div>

        <div class="ctnAcessoRapido">

            <h2>Acesso Rápido</h2>

            <div class="divAcessoRapido">

                <a href="#" class="btn-primary">
                    Gerenciar Consultas
                    <Icon icon="weui:arrow-filled" />
                </a>

                <a href="#" class="btn-primary">
                    Gerenciar Agendamentos
                    <Icon icon="weui:arrow-filled" />
                </a>
            </div>

        </div> -->
    </main>

</template>

<style lang="scss" scoped>
.ctnPrincipal {
    width: 80vw;
    height: 90vh;
    margin: 2rem auto;

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
        justify-content: space-evenly;
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
            border-radius: 16px;

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
        margin: auto;
        padding: 2rem;
        gap: 1rem;

        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;

        .divAcessoRapido {
            display: flex;
            justify-content: space-between;
            border-radius: 0.5rem;

            .btnAcessoRapido {
                display: flex;
                padding: 0.5rem 1rem;
                justify-content: space-between;
                align-items: center;
                width: 50%;
                color: black;
                border-radius: 1rem;

                &:hover {
                    background-color: #5387ca;
                    transition: 0.3s;
                }
            }
        }
    }
}
</style>
