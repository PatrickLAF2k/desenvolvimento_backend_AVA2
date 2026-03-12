<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <header class="headerContainer">

        <div class="divLogo">

            <Icon class="iconLogo" icon="majesticons:table-heart" />

            <h1 class="text-primary">MedAgenda</h1>

        </div>

        <nav class="navBar">
            <ul>
                <li>
                    <router-link to="/dashboard" class="card">
                        <Icon class="icon" icon="si:dashboard-duotone" />
                        <h2>Dashboard</h2>
                    </router-link>
                </li>

                <li>
                    <router-link to="/consultas" class="card">
                        <Icon class="icon" icon="uim:calender" />
                        <h2>Consultas</h2>
                    </router-link>
                </li>

                <li>
                    <router-link to="/pacientes" class="card">
                        <Icon class="icon" icon="pepicons-print:persons" />
                        <h2>Pacientes</h2>
                    </router-link>
                </li>
            </ul>
        </nav>
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
}
</style>
