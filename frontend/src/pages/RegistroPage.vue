<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useCadastro } from '../composables/useCadastro';
import { useCep } from '../composables/useCep';

const { form, erros, isLoading, mensagemSucesso, realizarCadastro } = useCadastro();
const { buscarEndereco, isBuscandoCep } = useCep(form);
</script>

<template>
    <main class="ctnPrincipal">
        <div class="divLogo">
            <Icon class="iconLogo" icon="majesticons:table-heart" />
            <h1 class="text-primary">MedAgenda</h1>
        </div>

        <section class="cardCadastro">
            <header class="headerCard">
                <h2>Criar Conta</h2>
                <p>Preencha os dados para acessar a plataforma</p>
            </header>

            <form class="formCadastro" @submit.prevent="realizarCadastro">

                <div class="inputGroup" :class="{ 'has-error': erros.nome }">
                    <label>Nome completo</label>
                    <input type="text" v-model="form.nome" placeholder="Ex: João Silva" />
                    <h3 class="erroMensagem" v-if="erros.nome">{{ erros.nome }}</h3>
                </div>

                <div class="row">

                    <div class="inputGroup" :class="{ 'has-error': erros.email }">
                        <label>Email</label>
                        <input type="email" v-model="form.email" placeholder="email@exemplo.com" />
                        <h3 class="erroMensagem" v-if="erros.email">{{ erros.email }}</h3>
                    </div>

                    <div class="inputGroup" :class="{ 'has-error': erros.telefone }">
                        <label>Telefone</label>
                        <input type="tel" v-model="form.telefone" placeholder="(99) 99999-9999" />
                        <h3 class="erroMensagem" v-if="erros.telefone">{{ erros.telefone }}</h3>
                    </div>
                </div>

                <div class="inputGroup" :class="{ 'has-error': erros.senha }">
                    <label>Senha</label>
                    <input type="password" v-model="form.senha" placeholder="••••••••" />
                    <h3 class="erroMensagem" v-if="erros.senha">{{ erros.senha }}</h3>
                </div>

                <hr />

                <span class="subtitulo">Endereço</span>

                <div class="row-cep">

                    <div class="inputGroup" :class="{ 'has-error': erros.cep }">
                        <label>CEP {{ isBuscandoCep ? '(Buscando...)' : '' }}</label>
                        <input type="text" v-model="form.cep" @blur="buscarEndereco" placeholder="00000-000" />
                        <h3 class="erroMensagem" v-if="erros.cep">{{ erros.cep }}</h3>
                    </div>

                    <div class="inputGroup" :class="{ 'has-error': erros.rua }">
                        <label>Rua</label>
                        <input type="text" v-model="form.rua" placeholder="Nome da rua" />
                        <h3 class="erroMensagem" v-if="erros.rua">{{ erros.rua }}</h3>
                    </div>

                </div>

                <div class="row-endereco">

                    <div class="inputGroup" :class="{ 'has-error': erros.bairro }">
                        <label>Bairro</label>
                        <input type="text" v-model="form.bairro" placeholder="Bairro" />
                        <h3 class="erroMensagem" v-if="erros.bairro">{{ erros.bairro }}</h3>
                    </div>

                    <div class="inputGroup" :class="{ 'has-error': erros.cidade }">
                        <label>Cidade</label>
                        <input type="text" v-model="form.cidade" placeholder="Cidade" />
                        <h3 class="erroMensagem" v-if="erros.cidade">{{ erros.cidade }}</h3>
                    </div>

                    <div class="inputGroup" :class="{ 'has-error': erros.uf }">
                        <label>UF</label>
                        <input type="text" v-model="form.uf" maxlength="2" placeholder="RJ" />
                        <h3 class="erroMensagem" v-if="erros.uf">{{ erros.uf }}</h3>
                    </div>

                </div>

                <button type="submit" class="btnPrincipal" :disabled="isLoading">
                    <span v-if="!isLoading">Finalizar Cadastro</span>
                    <span v-else>Enviando dados...</span>
                </button>

                <p v-if="mensagemSucesso" class="mensagemRetorno">{{ mensagemSucesso }}</p>
                <p v-if="erros.geral" class="mensagemRetornoErro">{{ erros.geral }}</p>

                <p class="footerLink">
                    Já tem conta? <router-link to="/home">Fazer Login</router-link>
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
    min-height: 100vh;
    padding: 2rem;
    background-color: #f8fafc;
    width: 100vw;
}

.divLogo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;

    .iconLogo {
        font-size: 2.5rem;
        color: $primary;
    }

    h1 {
        font-size: 1.8rem;
        color: $primary;
        font-weight: 800;
    }
}

.cardCadastro {
    background: white;
    width: 40%;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .headerCard {
        text-align: center;
        margin-bottom: 1rem;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: $primary;
        }

        p {
            color: $secondary;
            font-size: 0.9rem;
        }
    }
}

.formCadastro {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    hr {
        border: 0;
        border-top: 1px solid #f1f5f9;
        margin: 0.5rem 0;
    }

    .subtitulo {
        font-weight: 600;
        color: $secondary;
        font-size: 0.85rem;
        text-transform: uppercase;
    }

    .row {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 1rem;
    }

    .row-cep {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
    }

    .row-endereco {
        display: grid;
        grid-template-columns: 1fr 1fr 0.4fr;
        gap: 1rem;
    }

    .btnPrincipal {
        margin-top: 1rem;
        padding: 0.8rem;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        @include btnHoverEffect;
    }

    .footerLink {
        text-align: center;
        font-size: 0.9rem;
        color: $secondary;

        a {
            color: $primary;
            font-weight: 600;
        }
    }

    .mensagemRetorno{
        color: green;
        font-size: 1rem;
        padding: 1px
    }
    .mensagemRetornoErro{
        color: red;
        font-size: 1rem;
        padding: 1px
    }
}
</style>