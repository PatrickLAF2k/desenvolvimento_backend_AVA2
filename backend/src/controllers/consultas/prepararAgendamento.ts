import { Request, Response } from "express";
import { Op } from "sequelize";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";

export async function prepararAgendamento(req: Request, res: Response) {
    try {
        // 1. Pegar a data de hoje no formato YYYY-MM-DD para o filtro
        const hoje = new Date().toISOString().split('T')[0];

        // 2. Buscar médicos e agendamentos em paralelo (mais rápido)
        const [medicos, agendamentosOcupados] = await Promise.all([
            // Busca médicos para o seu Select
            MedicoModel.findAll({
                attributes: ['id', 'nome', 'especialidade'],
                order: [['nome', 'ASC']]
            }),

            // Busca apenas o essencial das consultas futuras para bloquear o grid
            AgendamentoModel.findAll({
                where: {
                    data: { [Op.gte]: hoje }, // Consultas de hoje para frente
                    status: { [Op.in]: ['agendada', 'confirmada'] } // Ignora as canceladas
                },
                attributes: ['id_medico', 'data', 'hora']
            })
        ]);

        // 3. Retornar os dados estruturados para o Frontend
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