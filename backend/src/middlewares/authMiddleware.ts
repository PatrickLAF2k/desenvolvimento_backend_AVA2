import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/auth";

export const autenticacaoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    try {

        if (!authHeader) {
            return res.status(401).json({
                message: "Acesso negado. Token não fornecido."
            });
        }

        const partes = authHeader.split(" ");

        if (partes.length !== 2) {
            return res.status(401).json({
                message: "Erro no formato do token. Use o padrão Bearer."
            });
        }

        const [prefixo, token] = partes;

        if (!/^Bearer$/i.test(prefixo)) {
            return res.status(401).json({
                message: "Token malformatado. Prefixo 'Bearer' ausente."
            });
        }

        const usuarioDecodificado = verificarToken(token);

        if (!usuarioDecodificado) {
            return res.status(401).json({
                message: "Token inválido ou expirado."
            });
        }

        (req as any).usuarioLogado = usuarioDecodificado;

        return next();

    } catch (error) {
        return res.status(500).json({
            message: "Erro interno no servidor durante a autenticação."
        });
    }


};