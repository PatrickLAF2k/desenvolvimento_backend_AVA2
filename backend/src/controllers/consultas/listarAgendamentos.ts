import { Request, Response } from "express";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";
import UsuarioModel from "../../models/UsuarioModel";

export async function listarAgendamentos(req: Request, res: Response) {
    try {
        const tipo = (req as any).usuarioLogado.tipo;
        if (tipo !== 'funcionario' && tipo !== 'admin') {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const { data, id_medico } = req.query;
        const onde: any = {};

        if (data) onde.data = data;
        if (id_medico) onde.id_medico = id_medico;

        const agendamentos = await AgendamentoModel.findAll({
            where: onde,
            attributes: ['id', 'data', 'hora', 'status'],
            include: [
                {
                    model: UsuarioModel,
                    as: 'paciente',
                    attributes: ['nome'] 
                },
                {
                    model: MedicoModel,
                    as: 'medico',
                    attributes: ['nome'] 
                }
            ],
          
            order: [
                ['data', 'ASC'],
                ['hora', 'ASC']
            ]
        });

  
        const formatados = agendamentos.map((a: any) => ({
            id: a.id,
            paciente: a.paciente?.nome || 'Não informado',
            medico: a.medico?.nome || 'Não informado',
            data: a.data,
            hora: a.hora,
            status: a.status
        }));

        return res.json(formatados);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar agendamentos.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        });
    }
}