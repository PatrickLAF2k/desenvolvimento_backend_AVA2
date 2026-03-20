import { Request, Response } from "express";
import AgendamentoModel from "../../models/AgendamentoModel";
import UsuarioModel from "../../models/UsuarioModel";
import MedicoModel from "../../models/MedicoModel"; 
import { Op } from "sequelize";

export async function getStatsPaciente(req: Request, res: Response) {

    const usuarioLogado = (req as any).usuarioLogado;
    const id_usuario = usuarioLogado?.id;

    console.log("ID recuperado do token:", id_usuario);

    try {
        
        const usuario = await UsuarioModel.findByPk(id_usuario, {
            attributes: ['nome']
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado no banco." });
        }

     
        const [consultasConcluidas, proximasConsultas] = await Promise.all([
            AgendamentoModel.count({
                where: {
                    id_usuario: id_usuario, 
                    status: 'concluida'
                }
            }),

            AgendamentoModel.findAll({
                where: {
                    id_usuario: id_usuario, 
                },
                attributes: ['id', 'data', 'hora', 'status'],
                include: [
                    {
                        model: MedicoModel, 
                        as: 'medico',
                        attributes: ['nome', 'especialidade']
                    }
                ],
                order: [['data', 'ASC'], ['hora', 'ASC']]
            })
        ]);

    
        const proximasConsultasFormatadas = proximasConsultas.map((consulta: any) => ({
            id: consulta.id,
            nome: consulta.medico?.nome || 'Médico não identificado',
            especialidade: consulta.medico?.especialidade || 'Geral',
            data: consulta.data,
            horario: consulta.hora,
            status: consulta.status
        }));


        return res.json({
            nome: usuario.nome,
            consultasConcluidas,
            proximasConsultas: proximasConsultasFormatadas
        });

    } catch (error) {
        console.error("Erro no GetStatsPaciente:", error);
        return res.status(500).json({ message: "Erro ao buscar dados do dashboard." });
    }
}