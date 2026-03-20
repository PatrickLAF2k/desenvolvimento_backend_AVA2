import { Request, Response } from "express";
import { Op } from "sequelize";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";

export async function prepararAgendamento(req: Request, res: Response) {
    try {

        const hoje = new Date().toISOString().split('T')[0];

        const [medicos, agendamentosOcupados] = await Promise.all([
            MedicoModel.findAll({
                attributes: ['id', 'nome', 'especialidade'],
                order: [['nome', 'ASC']]
            }),

            AgendamentoModel.findAll({
                where: {
                    data: { [Op.gte]: hoje },
                    status: { [Op.in]: ['agendada', 'confirmada'] } 
                },
                attributes: ['id_medico', 'data', 'hora']
            })
        ]);

       
        return res.status(200).json({
            medicos,
            agendamentosOcupados
        });

    } catch (error) {
        console.error("Erro ao preparar agendamento:", error);
        return res.status(500).json({
            message: "Erro ao carregar dados de médicos e horários.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        });
    }
}