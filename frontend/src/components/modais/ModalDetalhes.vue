<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps<{ consulta: any }>();
defineEmits(['fechar']);

const formatarData = (dataStr: string) => {
    if (!dataStr) return '';
    return dataStr.split('-').reverse().join('/');
};

// Lógica de leitura ultra-segura
const previsao = computed(() => {
    const dadosRaw = localStorage.getItem('previsao_clima');
    if (!dadosRaw) return null;

    try {
        const parsed = JSON.parse(dadosRaw);
        // Se for um array, pega o primeiro. Se for objeto direto, usa ele.
        const clima = Array.isArray(parsed) ? parsed[0] : parsed;

        return {
            temp: clima.temp || clima.temperature || '22',
            descricao: clima.descricao || clima.description || 'Nublado',
            icone: clima.icone || '☁️'
        };
    } catch (e) {
        console.error("Erro ao processar clima do storage:", e);
        return null;
    }
});
</script>

<template>
    <div class="modal-overlay" @click.self="$emit('fechar')">
        <div class="modal-content">
            <div class="modal-header">
                <h2>
                    <Icon icon="solar:clipboard-list-bold" /> Detalhes da Consulta
                </h2>
                <button class="btn-close" @click="$emit('fechar')">×</button>
            </div>

            <div class="modal-body">
                <div class="info-group">
                    <label>Paciente</label>
                    <p>{{ consulta?.paciente }}</p>
                </div>

                <div class="info-group">
                    <label>E-mail</label>
                    <p>{{ consulta?.email || 'Nao informado' }}</p>
                </div>

                <div class="info-row">
                    <div class="info-group">
                        <label>Médico</label>
                        <p>{{ consulta?.medico }}</p>
                    </div>
                    <div class="info-group">
                        <label>Status</label>
                        <span :class="['status-tag', `status-${consulta?.status}`]">
                            {{ consulta?.status }}
                        </span>
                    </div>
                </div>

                <div class="info-row">
                    <div class="info-group">
                        <label>Data</label>
                        <p>{{ formatarData(consulta?.data) }}</p>
                    </div>
                    <div class="info-group">
                        <label>Horário</label>
                        <p>{{ consulta?.hora?.substring(0, 5) }}</p>
                    </div>
                </div>

                <div class="clima-section" v-if="previsao">
                    <label>Previsão do Tempo (Rio de Janeiro)</label>
                    <div class="clima-card">
                        <span class="clima-icon">{{ previsao.icone }}</span>
                        <span class="clima-temp">{{ previsao.temp }}°C</span>
                        <span class="clima-desc">— {{ previsao.descricao }}</span>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn-entendido" @click="$emit('fechar')">Entendido</button>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    backdrop-filter: blur(3px);
}

.modal-content {
    background: white;
    width: 90%;
    max-width: 500px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
    background: #f8fafc;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;

    h2 {
        font-size: 1.25rem;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0;
    }
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #94a3b8;
}

.modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.info-group {
    label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #64748b;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 4px;
        display: block;
    }

    p {
        font-size: 1rem;
        color: #334155;
        font-weight: 500;
        margin: 0;
    }
}

.status-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: capitalize;
    display: inline-block;

    &.status-agendada {
        background: #e0f2fe;
        color: #0369a1;
    }

    &.status-cancelada {
        background: #fee2e2;
        color: #b91c1c;
    }
}

.clima-section {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    padding: 1rem;
    border-radius: 12px;

    .clima-card {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 5px;
    }

    .clima-temp {
        font-weight: 700;
        font-size: 1.1rem;
        color: #0369a1;
    }

    .clima-desc {
        color: #0c4a6e;
    }
}

.modal-footer {
    padding: 1rem 1.5rem;
    text-align: right;
    background: #f8fafc;
}

.btn-entendido {
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}
</style>