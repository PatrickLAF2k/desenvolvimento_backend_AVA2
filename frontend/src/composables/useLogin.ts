import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { z } from 'zod';
import { type Login } from '@/types';
const API_URL = import.meta.env.VITE_API_URL;

const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    senha: z.string()
        .min(1, "A senha é obrigatória")
        .max(10, "A senha deve ter no máximo 10  caracteres")
});


export function useLogin() {
    const router = useRouter();

    const isLoading = ref(false);

    const erros = reactive<Record<string, string>>({});

    const form = reactive<Login>({
        email: '',
        senha: ''
    });

    async function realizarLogin() {
        isLoading.value = true;

        Object.keys(erros).forEach(key => delete erros[key]);

        const validacao = loginSchema.safeParse(form);

        if (!validacao.success) {
            validacao.error.issues.forEach(err => {
                const campo = err.path[0] as string;
                erros[campo] = err.message;
            });
            isLoading.value = false;
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/login`, form);

            const token = response.data.token;

            localStorage.setItem('token', token);

            router.push('/dashboard');

        } catch (error: any) {

            if (error.response && error.response.data) {

                erros.geral = error.response.data.message;

            } else {
                erros.geral = "Erro ao conectar com o servidor.";
            }
        } finally {
            isLoading.value = false;
        }
    }

    return { form, erros, isLoading, realizarLogin };
}