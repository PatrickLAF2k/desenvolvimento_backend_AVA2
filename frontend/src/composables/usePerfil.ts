import { ref, computed } from 'vue';
import api from '../services/api';

interface Perfil {
    nome: string;
    tipo: string;
}

// Estado global
const perfil = ref<Perfil | null>(null);
const isLoading = ref(false);
const erroPerfil = ref<string | null>(null);

export function usePerfil() {

    async function buscarPerfil() {
        if (perfil.value) return;

        isLoading.value = true;
        erroPerfil.value = null;

        try {
            const response = await api.get('/perfil');
            perfil.value = response.data;
        } catch (err: any) {
            perfil.value = null;
            erroPerfil.value = err.response?.data?.message || "Erro ao carregar perfil";

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
            }
        } finally {
            isLoading.value = false;
        }
    }

    function limparPerfil() {
        perfil.value = null;
        erroPerfil.value = null;
    }

    const isAdmin = computed(() => perfil.value?.tipo === 'admin');

    return {
        perfil,
        isLoading,
        erroPerfil,
        buscarPerfil,
        limparPerfil,
        isAdmin
    };
}