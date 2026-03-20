import { Request, Response } from "express";
import AgendamentoModel from "../../models/AgendamentoModel";

export async function cancelarAgendamento(req: Request, res: Response) {
    try {
        // Pegamos o ID da consulta pela URL (ex: /agendamento/:id)
        const { id } = req.params;
        const { id: id_usuario, tipo } = (req as any).usuarioLogado;

        // 1. Buscar o agendamento
        const agendamento = await AgendamentoModel.findByPk(id);

        if (!agendamento) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        // 2. Trava de Segurança: Paciente só cancela o DELE. Admin cancela QUALQUER.
        if (tipo !== 'admin' && agendamento.id_usuario !== id_usuario) {
            return res.status(403).json({ message: "Você não tem permissão para cancelar este agendamento." });
        }

        // 3. Atualizar o status em vez de deletar (Mantém o histórico)
        await agendamento.update({ status: 'cancelada' });

        return res.status(200).json({
            message: "Agendamento cancelado com sucesso.",
            id: id
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao cancelar agendamento.",
            error: error instanceof Error ? error.message : "Erro desconhecido"
        });
    }
}