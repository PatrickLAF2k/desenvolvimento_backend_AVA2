import { Request, Response } from "express";
import { agendamento } from "../../types";
import AgendamentoModel from "../../models/AgendamentoModel";

export async function agendamento(req: Request<{}, {}, agendamento>, res: Response) {
    try {
        const { id: id_usuario } = (req as any).usuarioLogado;
        const { id_medico, data, hora, status, observacao } = req.body;

        const dataISO = data.split("/").reverse().join("-");

        const agendamentoExistente = await AgendamentoModel.findOne({
            where: {
                id_medico,
                data: dataISO,
                hora,
                status: ['agendada', 'confirmada']
            }
        });

        if (agendamentoExistente) {
            return res.status(400).json({
                message: "Conflito de horário: Este médico já possui um agendamento para este dia e hora."
            });
        }

        const novoAgendamento = await AgendamentoModel.create({
            id_usuario: id_usuario,
            id_medico,
            data: dataISO,
            hora,
            status,
            observacao
        });

        return res.status(201).json({
            message: "Agendamento criado com sucesso.",
            agendamento: novoAgendamento
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao fazer agendamento. passou aqui",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        })
    }
}