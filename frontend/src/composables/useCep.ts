import axios from 'axios';
import { ref } from 'vue';

export function useCep(form: any) {
    const isBuscandoCep = ref(false);
    const erroCep = ref(false);

    async function buscarEndereco() {
        // Remove tudo que não é número
        const cepLimpo = form.cep.replace(/\D/g, '');

        // Só dispara a busca se tiver exatamente 8 dígitos
        if (cepLimpo.length !== 8) return;

        isBuscandoCep.value = true;
        erroCep.value = false;

        try {
            // Chamada externa (sem interceptors de token)
            const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

            if (data.erro) {
                erroCep.value = true;
                return;
            }

            // Preenche o formulário reativo passado por referência
            form.rua = data.logradouro;
            form.bairro = data.bairro;
            form.cidade = data.localidade;
            form.uf = data.uf;

        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            erroCep.value = true;
        } finally {
            isBuscandoCep.value = false;
        }
    }

    return { buscarEndereco, isBuscandoCep, erroCep };
}