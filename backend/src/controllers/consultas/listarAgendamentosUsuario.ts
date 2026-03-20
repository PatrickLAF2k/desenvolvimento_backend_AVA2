import { Request, Response } from "express";
import { Op } from "sequelize";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";


export async function listarMedicos(req: Request, res: Response) {
    try {
        const medicos = await MedicoModel.findAll({
            attributes: ['id', 'nome', 'especialidade']
        });
        return res.json(medicos);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar médicos." });
    }
}


export async function listarOcupados(req: Request, res: Response) {
    const { id_medico, data } = req.query;
    try {
        const ocupados = await AgendamentoModel.findAll({
            where: {
                id_medico: String(id_medico),
                data: String(data),
                status: { [Op.ne]: 'cancelada' }
            },
            attributes: ['hora']
        });

        return res.json(ocupados.map((o: any) => o.hora));
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar horários." });
    }
}


export async function salvarAgendamento(req: Request, res: Response) {
    const { id_medico, data, hora, observacao } = req.body;
    const id_usuario = (req as any).usuarioLogado.id;

    try {
        const novo = await AgendamentoModel.create({
            id_usuario,
            id_medico,
            data, 
            hora,
            observacao,
            status: 'agendada'
        });
        return res.status(201).json({ success: true, novo });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao agendar." });
    }
}