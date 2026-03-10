import { Request, Response } from "express";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";
import UsuarioModel from "../../models/UsuarioModel";

export async function listarAgendamentos(req: Request, res: Response) {
    try {

        console.log((req as any).usuarioLogado.tipo)
        if ((req as any).usuarioLogado.tipo !== 'funcionario') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const { data, id_medico } = req.query;
        const onde: any = {};

        if (data) onde.data = data;
        if (id_medico) onde.id_medico = id_medico;

        const agendamentos = await AgendamentoModel.findAll({
            where: onde,
            include: [
                { model: UsuarioModel, as: 'paciente', attributes: ['nome', 'email'] },
                { model: MedicoModel, as: 'medico', attributes: ['nome'] }
            ]
        });

        return res.json(agendamentos);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar agendamentos.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        });
    }
}