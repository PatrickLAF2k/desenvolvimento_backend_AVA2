import { Request, Response } from "express";
import AgendamentoModel from "../../models/AgendamentoModel";
import UsuarioModel from "../../models/UsuarioModel";
import { Op } from "sequelize";

export async function getStats(req: Request, res: Response) {

    const hoje = new Date().toISOString().split('T')[0];

    try {
        const [canceladas, pacientes, totalAgendamentos, consultasHoje] = await Promise.all([
            AgendamentoModel.count({ where: { status: 'cancelada' } }),
            UsuarioModel.count({ where: { tipo: 'paciente' } }),
            AgendamentoModel.count({ where: { status: { [Op.ne]: 'cancelada' } } }),
            AgendamentoModel.count({
                where: {
                    data: hoje,
                    status: { [Op.ne]: 'cancelada' }
                }
            })
        ]);


        return res.json({
            canceladas,
            pacientes,
            totalAgendamentos,
            consultasHoje
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar estatísticas." });
    }
}