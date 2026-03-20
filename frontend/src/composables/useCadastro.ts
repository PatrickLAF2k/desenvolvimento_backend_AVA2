import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import api from '../services/api'; // Agora usamos nossa instância centralizada

// O Schema do Zod continua igual, garantindo a integridade dos dados
const cadastroSchema = z.object({
    nome: z.string().min(10, "Digite o nome completo (mínimo 10 caracteres)"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(10, "A senha deve ter no máximo 10 caracteres"),
    telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
    cep: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
    rua: z.string().min(1, "A rua é obrigatória"),
    bairro: z.string().min(1, "O bairro é obrigatório"),
    cidade: z.string().min(1, "A cidade é obrigatória"),
    uf: z.string().length(2, "UF deve ter exatamente 2 caracteres").toUpperCase()
});

export function useCadastro() {
    const router = useRouter();
    const isLoading = ref(false);
    const mensagemSucesso = ref('');
    const erros = reactive<Record<string, string>>({});

    const form = reactive({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        uf: ''
    });

    async function realizarCadastro() {
        isLoading.value = true;

        // Limpa erros anteriores
        Object.keys(erros).forEach(key => delete erros[key]);

        // Validação Zod
        const validacao = cadastroSchema.safeParse(form);

        if (!validacao.success) {
            validacao.error.issues.forEach(err => {
                const campo = err.path[0] as string;
                erros[campo] = err.message;
            });
            isLoading.value = false;
            return;
        }

        try {
            // USANDO A API CENTRALIZADA: 
            // Não precisa de `${API_URL}` nem de headers manuais
            const response = await api.post('/cadastro', form);

            mensagemSucesso.value = response.data.message || "Cadastro realizado com sucesso!";

            // Redireciona após 2 segundos para o usuário ler a mensagem
            setTimeout(() => router.push('/home'), 2000);

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

    return { form, erros, isLoading, mensagemSucesso, realizarCadastro };
}