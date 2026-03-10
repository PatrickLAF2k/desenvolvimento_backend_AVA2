import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const schema = z.object({
    nome: z
        .string()
        .min(10, "Digite o nome completo"),
    email: z
        .email("Digite um email válido"),
    senha: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .max(20, "A senha deve ter no máximo 20 caracteres")
});

export function validarCadastro(req: Request, res: Response, next: NextFunction) {

    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {

        const erros: Record<string, string> = {};

        for (const erro of resultado.error.issues) {

            const campo = erro.path[0] as string;

            if (!erros[campo]) {
                erros[campo] = erro.message;
            }

        }

        return res.status(400).json({
            erros
        });

    }

    req.body = resultado.data;

    next();
}