<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Curso } from "../types"

const cursos = ref<Curso[]>([])

const isLoading = ref(true)
const nome = ref("")
const email = ref("")
const telefone = ref("")
const cpf = ref("")
const resposta = ref("")
const cursoId = ref<number | null>(null)


onMounted(async () => {
    try {
        const response = await fetch("http://localhost:3000/cursos")
        const data = await response.json()
        cursos.value = data
    } catch (error) {
        console.error("Erro ao buscar cursos:", error)
    } finally {
        isLoading.value = false
    }
})

const enviarFormulario = async () => {

    resposta.value = ""

    const payload = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cpf: cpf.value,
        cursoId: cursoId.value
    }

    try {
        const response = await fetch("http://localhost:3000/matricula", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {

            const errorData = await response.json()
            throw new Error(errorData.message)

        } resposta.value = "Matrícula realizada com sucesso!"

        nome.value = ""
        email.value = ""
        telefone.value = ""
        cpf.value = ""
        cursoId.value = null


    } catch (error: any) {
        resposta.value = error.message
    }
}
</script>

<template>
    <div class="containerMatricula">

        <h1>Formulário de Matrícula</h1>

        <form @submit.prevent="enviarFormulario">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="nome" required />

            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />

            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" v-model="telefone" required />

            <label for="cpf">CPF</label>
            <input type="text" id="cpf" v-model="cpf" required />

            <label for="curso">Curso</label>
            <select v-model="cursoId" required>
                <option :value="null" disabled>Selecione um curso...</option>
                <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
                    {{ curso.nome }}
                </option>
            </select>

            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Carregando...' : 'Matricular' }}
            </button>
            <h2 class="error">
                {{ resposta }}
            </h2>
        </form>
    </div>
</template>

<style scoped>
.containerMatricula {
    padding: 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.1px);
    border: 1px solid rgba(255, 255, 255, 0.17);
    width: 400px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.error {
    margin: 0 auto;
    font-size: 18px;
    color: red;
}

input,
select,
button {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

label {
    font-weight: bold;
}

button {
    background-color: #42b883;
    color: white;
    cursor: pointer;
    font-weight: bold;
}

button:disabled {
    background-color: #ccc;
}
</style>