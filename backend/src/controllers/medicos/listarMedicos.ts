import { Request, Response } from "express";
import MedicoModel from "../../models/MedicoModel";

export async function listarMedicos(req: Request, res: Response) {
    try {

        const medicos = await MedicoModel.findAll({
            attributes: ['id', 'nome', 'especialidade', 'crm'],
            order: [['nome', 'ASC']],
        });

        return res.status(200).json({
            medicos,

        });



    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar usuário." })
    }
}