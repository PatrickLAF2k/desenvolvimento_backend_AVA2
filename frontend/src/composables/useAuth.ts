import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePerfil } from './usePerfil'; // Importamos para limpar o perfil no logout

// Mantemos o token como um ref global para persistência entre componentes
const token = ref(localStorage.getItem('token'));

export function useAuth() {
    const router = useRouter();
    const { limparPerfil } = usePerfil(); // Função que zera o ref do usuário

    const isAutenticado = computed(() => !!token.value);

    function salvarToken(novoToken: string) {
        localStorage.setItem('token', novoToken);
        token.value = novoToken;
    }

    function logout() {
        // 1. Limpa o armazenamento local
        localStorage.removeItem('token');
        
        // 2. Limpa o estado reativo
        token.value = null;
        
        // 3. Limpa os dados do perfil (Segurança!)
        limparPerfil(); 
        
        // 4. Redireciona
        router.push('/home');
    }

    function verificarAcesso() {
        // Se não houver token, manda para a Home/Login
        if (!isAutenticado.value) {
            router.push('/home');
        }
    }

    return {
        token,
        isAutenticado,
        salvarToken,
        logout,
        verificarAcesso
    };
}