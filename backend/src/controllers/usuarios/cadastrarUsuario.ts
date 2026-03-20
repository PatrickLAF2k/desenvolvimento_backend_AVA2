import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { usuario } from "../../types";
import UsuarioModel from "../../models/UsuarioModel";


export async function cadastro(req: Request<{}, {}, usuario>, res: Response) {
    try {
        const { nome, email, senha, telefone, cep, rua, bairro, cidade, uf } = req.body;

        console.log(req.body);


        const usuarioExistente = await UsuarioModel.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ message: "Email já cadastrado." });
        }
        if (!senha) {
            return res.status(400).json({ message: "A senha é obrigatória." });
        }

        const senhaHash = bcrypt.hashSync(senha, 10);

        await UsuarioModel.create({
            nome,
            email,
            senha: senhaHash,
            tipo: "paciente",
            telefone,
            cep,
            rua,
            bairro,
            cidade,
            uf
        })

        res.status(201).json({ message: `Usuário ${nome} cadastrado com sucesso!` })

    } catch (error: any) {

        res.status(500).json({
            message: "Erro ao cadastrar usuário.",
            error: error.message 
        });
    }
}