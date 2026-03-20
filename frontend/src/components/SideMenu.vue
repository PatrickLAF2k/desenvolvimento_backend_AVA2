<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';
import { usePerfil } from '../composables/usePerfil';
import { useAuth } from '../composables/useAuth';

const { perfil, isAdmin, buscarPerfil } = usePerfil();
const { logout } = useAuth();

onMounted(() => {
    buscarPerfil();
});

</script>

<template>
    <header class="headerContainer">
        <div class="divLogo">
            <Icon class="iconLogo" icon="majesticons:table-heart" />
            <h1 class="text-primary">MedAgenda</h1>
            <h2 v-if="perfil">{{ perfil.tipo }}</h2>
        </div>

        <nav class="navBar">

            <ul>

                <li>
                    <router-link :to="isAdmin ? '/dashboardAdmin' : '/dashboardPaciente'" class="card">
                        <Icon class="icon" icon="si:dashboard-duotone" />
                        <h2>Dashboard</h2>
                    </router-link>
                </li>

                <li v-if="perfil && !isAdmin">
                    <router-link to="/agendamentosPaciente" class="card">
                        <Icon class="icon" icon="solar:calendar-add-bold-duotone" />
                        <h2>Agendar</h2>
                    </router-link>
                </li>

                <li v-if="perfil && isAdmin">
                    <router-link to='/consultasAdmin' class="card">
                        <Icon class="icon" icon="uim:calender" />
                        <h2>Consultas</h2>
                    </router-link>
                </li>

                <li v-if="isAdmin">
                    <router-link to="/pacientesAdmin" class="card">
                        <Icon class="icon" icon="pepicons-print:persons" />
                        <h2>Pacientes</h2>
                    </router-link>
                </li>


            </ul>

        </nav>

        <div class="divButton">
            <button @click="logout" class="btnLogout">
                <Icon icon="material-symbols:logout-rounded" width="24" height="24" />
                Sair do Sistema
            </button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use "../global.scss" as *;

.headerContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15vw;
    height: 100vh;
    padding: 2rem 0;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    background-color: white;


}

.divLogo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 3rem;

    h1 {
        font-size: 1.4rem;
        color: $primary;
        font-weight: 700;
    }

    .iconLogo {
        font-size: 2rem;
        color: $secondary;
    }

    h2 {
        font-size: 0.9rem;
        color: #006aff;
        font-weight: 500;
    }
}

.navBar {
    width: 100%;

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .card {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem 1.5rem;
            cursor: pointer;
            transition: all 0.2s ease;

            .icon {
                color: $secondary;
                font-size: 1.3rem;
            }

            h2 {
                color: $text-dark;
                font-size: 1rem;
                font-weight: 500;
            }

            &:hover {
                background-color: rgba($primary, 0.05);

                .icon,
                h2 {
                    color: $secondary;
                }
            }

            &.router-link-active {
                background-color: rgba($primary, 0.1);
                border-right: 4px solid $primary;

                .icon,
                h2 {
                    color: $primary;
                    font-weight: 600;
                }
            }
        }
    }
}

div.divButton {
    margin-top: auto;
    width: 100%;
    display: flex;
    justify-content: center;

    .btnLogout {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.8rem;
        border: none;
        background-color: #fff1f2;
        color: #e11d48;

        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: #e11d48;
            color: white;
            box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
        }

        .icon {
            font-size: 1.2rem;
        }
    }
}
</style>
