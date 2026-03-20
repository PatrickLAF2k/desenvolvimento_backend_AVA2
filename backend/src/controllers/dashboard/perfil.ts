import { Request, Response } from "express";
import UsuarioModel from "../../models/UsuarioModel";

export async function perfil(req: Request, res: Response) {
    try {
        const { id } = (req as any).usuarioLogado;

        const usuario = await UsuarioModel.findByPk(id, {
            attributes: ['nome', 'tipo']
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.json(usuario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao carregar perfil." });
    }
}