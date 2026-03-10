import { Request, Response } from "express";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";

export async function listarMeusAgendamentos(req: Request, res: Response) {
    const { id: id_usuario } = (req as any).usuarioLogado;

    const agendamentos = await AgendamentoModel.findAll({
        where: { id_usuario },
        include: [{ model: MedicoModel, as: 'medico', attributes: ['nome', 'especialidade'] }],
        order: [['data', 'ASC'], ['hora', 'ASC']]
    });

    return res.json(agendamentos);
}