import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { usuario } from "../../types";
import UsuarioModel from "../../models/UsuarioModel";


export async function cadastro(req: Request<{}, {}, usuario>, res: Response) {
    try {
        const { nome, email, senha } = req.body;
        const id = uuidv4()

        const usuarioExistente = await UsuarioModel.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ message: "Email já cadastrado." });
        }

        const senhaHash = bcrypt.hashSync(senha, 10);

        UsuarioModel.create({
            id,
            nome,
            email,
            senha: senhaHash,
            tipo: "paciente"
        })

        res.status(201).json({ message: `Usuário ${nome} cadastrado com sucesso!` })

    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar usuário." })
    }
}