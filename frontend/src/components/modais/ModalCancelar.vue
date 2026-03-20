<template>
    <div class="modal-overlay" @click.self="$emit('fechar')">
        <div class="modal-content">
            <h2>Confirmar Cancelamento</h2>
            <p>Deseja realmente cancelar a consulta de <strong>{{ nomePaciente }}</strong>?</p>

            <div class="modal-actions">
                <button @click="$emit('fechar')" class="btnVoltar" :disabled="loading">
                    Voltar
                </button>

                <button @click="$emit('confirmar')" class="btnConfirmar" :disabled="loading">
                    <span v-if="loading">Cancelando...</span>
                    <span v-else>Confirmar</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Adicionamos a prop 'loading' que vem do hook lá no componente pai
defineProps({
    nomePaciente: String,
    loading: Boolean
});

defineEmits(['fechar', 'confirmar']);
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.btnVoltar {
    padding: 0.6rem 1.2rem;
    border: none;
    background: #e2e8f0;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

.btnConfirmar {
    padding: 0.6rem 1.2rem;
    border: none;
    background: #ef4444;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
        background: #fca5a5;
        cursor: not-allowed;
    }
}
</style>