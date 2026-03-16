<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useLogin } from '../composables/useLogin';


const { form, erros, isLoading, realizarLogin } = useLogin();
</script>

<template>

    <main class="ctnPrincipal">

        <div class="divLogo">
            <Icon class="iconLogo" icon="majesticons:table-heart" />
            <h1 class="text-primary">MedAgenda</h1>
        </div>

        <section class="cardLogin">

            <header class="headerCard">
                <h2>Bem-vindo de volta</h2>
                <p>Insira suas credenciais para acessar o painel</p>
            </header>

            <form class="formLogin" @submit.prevent="realizarLogin">

                <div class="inputGroup" :class="{ 'has-error': erros.email }">
                    <label>E-mail</label>
                    <div class="inputWrapper">
                        <input type="email" v-model="form.email" placeholder="seu@email.com" />
                    </div>
                    <span class="erroMensagem" v-if="erros.email">{{ erros.email }}</span>
                </div>

                <div class="inputGroup" :class="{ 'has-error': erros.senha }">
                    <label>Senha</label>
                    <div class="inputWrapper">
                        <input type="password" v-model="form.senha" placeholder="••••••••" />
                    </div>
                    <span class="erroMensagem" v-if="erros.senha">{{ erros.senha }}</span>
                </div>

                <p class="erroMensagem centralizado" v-if="erros.geral">
                    {{ erros.geral }}
                </p>

                <button type="submit" class="btnPrincipal" :disabled="isLoading">
                    <Icon v-if="!isLoading" icon="material-symbols-light:login" width="24" height="24" />
                    <Icon v-else icon="eos-icons:loading" width="24" height="24" />
                    {{ isLoading ? 'Entrando...' : 'Entrar' }}
                </button>

                <p class="footerLink">
                    Não tem uma conta?
                    <router-link to="/registro">Cadastrar agora</router-link>
                </p>
            </form>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@use "../global.scss" as *;

.ctnPrincipal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f8fafc; // Fundo suave igual ao registro
    padding: 2rem;
}

.divLogo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;

    .iconLogo {
        font-size: 3rem;
        color: $primary; // Padronizado com o registro
    }

    h1 {
        font-size: 2rem;
        color: $primary;
        font-weight: 800;
    }
}

.cardLogin {
    background: white;
    width: 100%;
    max-width: 450px;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .headerCard {
        text-align: center;
        margin-bottom: 2rem;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: $primary;
            margin-bottom: 0.5rem;
        }

        p {
            color: $secondary;
            font-size: 0.9rem;
        }
    }
}

.formLogin {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .inputGroup {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
        }

        input {
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            background: #fdfdfd;
            border: 1px solid #e2e8f0;
            @include inputFocusEffect; // Seu mixin de foco
        }
    }

    .btnPrincipal {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        @include btnHoverEffect;
    }

    .footerLink {
        text-align: center;
        font-size: 0.9rem;
        color: $secondary;
        margin-top: 0.5rem;

        a {
            color: $primary;
            font-weight: 600;
            text-decoration: none;
            transition: 0.3s;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>