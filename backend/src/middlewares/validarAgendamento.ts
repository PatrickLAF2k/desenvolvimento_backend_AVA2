import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const schema = z.object({
    id_medico: z
        .string("O médico é obrigatório"),

    data: z.string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use o formato DD/MM/AAAA"),

    hora: z
        .string("O horário é obrigatório")
        .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora inválido (HH:MM)"),

    observacao: z
        .string()
        .max(500, "A observação deve ter no máximo 500 caracteres")
        .optional(),

    status: z
        .enum(["agendada", "confirmada", "cancelada", "concluida"])
        .default("agendada")
});

export function validarAgendamento(req: Request, res: Response, next: NextFunction) {

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