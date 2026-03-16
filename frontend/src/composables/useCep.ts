import axios from 'axios';
import { ref } from 'vue';

export function useCep(form: any) {
    const isBuscandoCep = ref(false);

    async function buscarEndereco() {
        const cepLimpo = form.cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        isBuscandoCep.value = true;
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            if (!data.erro) {
                form.rua = data.logradouro;
                form.bairro = data.bairro;
                form.cidade = data.localidade;
                form.uf = data.uf;
            }
        } catch (error) {
            console.error("Erro ao buscar CEP");
        } finally {
            isBuscandoCep.value = false;
        }
    }

    return { buscarEndereco, isBuscandoCep };
}