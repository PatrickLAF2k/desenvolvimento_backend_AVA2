import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { usuario } from "../../types";
import UsuarioModel from "../../models/UsuarioModel";
import { gerarToken } from "../../utils/auth";

export async function login(req: Request<{}, {}, usuario>, res: Response) {
    try {
        const { email, senha } = req.body;

        const usuarioExistente = await UsuarioModel.findOne({ where: { email } }) as any;

        if (!usuarioExistente) {
            return res.status(400).json({ message: "Email ou senha invalidos." });
        }
        const senhaValida = bcrypt.compareSync(senha, usuarioExistente.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: "Email ou senha invalidos." });
        }

        const token = gerarToken({ id: usuarioExistente.id, email: usuarioExistente.email, tipo: usuarioExistente.tipo });

        return res.status(200).header("Authorization", `Bearer ${token}`).json({
            token,
        });



    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar usuário." })
    }
}