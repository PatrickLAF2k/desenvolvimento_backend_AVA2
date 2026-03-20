import { Request, Response } from "express";
import MedicoModel from "../../models/MedicoModel";
import AgendamentoModel from "../../models/AgendamentoModel";
import UsuarioModel from "../../models/UsuarioModel";

export async function listarAgendamentos(req: Request, res: Response) {
    try {
        // Verifica permissão (ajustei para aceitar 'funcionario' ou 'admin')
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
            attributes: ['id', 'data', 'hora', 'status'], // Puxa apenas o necessário do agendamento
            include: [
                {
                    model: UsuarioModel,
                    as: 'paciente',
                    attributes: ['nome'] // Puxa apenas o nome do paciente
                },
                {
                    model: MedicoModel,
                    as: 'medico',
                    attributes: ['nome'] // Puxa apenas o nome do médico
                }
            ],
            // ORDENAÇÃO: Primeiro por data, depois por hora (mais recentes primeiro)
            order: [
                ['data', 'ASC'],
                ['hora', 'ASC']
            ]
        });

        // Opcional: Mapear os dados para que o Front receba "nomePaciente" direto,
        // facilitando o uso na sua tabela sem precisar de 'consulta.paciente.nome'
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