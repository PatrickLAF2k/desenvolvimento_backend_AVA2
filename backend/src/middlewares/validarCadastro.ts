import { Request, Response, NextFunction } from "express";
import { z } from "zod";


const schema = z.object({
    nome: z
        .string()
        .min(10, "Digite o nome completo"),
    email: z
        .string()
        .email("Digite um email válido"),
    senha: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .max(20, "A senha deve ter no máximo 20 caracteres"),
    telefone: z
        .string()
        .min(10, "Telefone inválido (mínimo 10 dígitos)"),
    cep: z
        .string()
        .min(8, "CEP deve ter 8 dígitos")
        .max(9, "CEP inválido"),
    rua: z
        .string()
        .min(1, "A rua é obrigatória"),
    bairro: z
        .string()
        .min(1, "O bairro é obrigatório"),
    cidade: z
        .string()
        .min(1, "A cidade é obrigatória"),
    uf: z
        .string()
        .length(2, "UF deve ter exatamente 2 caracteres")
        .toUpperCase()
});


export function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
        // 1. Pegamos apenas o PRIMEIRO erro para enviar como "message"
        // Isso resolve o seu problema de "aparecer array no front"
        const primeiraMensagem = resultado.error.issues[0].message;

        // 2. Se você ainda quiser mandar os erros por campo, pode mandar um objeto
        const errosPorCampo: Record<string, string> = {};
        resultado.error.issues.forEach((erro) => {
            const campo = erro.path[0] as string;
            if (!errosPorCampo[campo]) {
                errosPorCampo[campo] = erro.message;
            }
        });

        // Retornamos um formato que o seu catch do Front vai entender facinho
        return res.status(400).json({
            message: primeiraMensagem, // A mensagem principal
            errors: errosPorCampo      // Opcional: detalhes por campo
        });
    }

    // Se passou, o data já vem com o .toUpperCase() do UF aplicado!
    req.body = resultado.data;
    next();
}