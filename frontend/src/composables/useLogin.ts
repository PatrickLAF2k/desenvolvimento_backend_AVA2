import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { type Login } from '../types';
import { useAuth } from './useAuth';
import api from '../services/api';
import { buscarPrevisaoCompleta } from '../services/clima';

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(1, "A senha é obrigatória").max(10, "A max 10")
});

export function useLogin() {
    const router = useRouter();

    const { salvarToken } = useAuth();

    const isLoading = ref(false);

    const erros = reactive<Record<string, string>>({});

    const form = reactive<Login>({ email: '', senha: '' });

    async function realizarLogin() {
        isLoading.value = true;
        Object.keys(erros).forEach(key => delete erros[key]);

        const validacao = loginSchema.safeParse(form);

        if (!validacao.success) {
            validacao.error.issues.forEach(err => { erros[err.path[0] as string] = err.message; });
            isLoading.value = false;
            return;
        }

        try {
            const response = await api.post('/login', form);
            const { token, tipo } = response.data;
            salvarToken(token);


            try {
                const listaClima = await buscarPrevisaoCompleta();

                if (listaClima && listaClima.length > 0) {
                    localStorage.setItem('previsao_clima', JSON.stringify(listaClima));
                }
            } catch (e) {

                console.log("Erro silencioso no clima (não trava o login)");

            }

            router.push(tipo == 'admin' ? '/dashboardAdmin' : '/dashboardPaciente');

        } catch (error: any) {
            erros.geral = error.response?.data?.message || "Erro ao conectar com o servidor.";
        } finally {
            isLoading.value = false;
        }
    }

    return { form, erros, isLoading, realizarLogin };
}