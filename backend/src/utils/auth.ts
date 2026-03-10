import jwt from "jsonwebtoken";
import { usuario } from "../types";

const JWT_SECRET = process.env.JWT_SECRET;

// Se a variável não existir, o servidor para imediatamente com um erro claro
if (!JWT_SECRET) {
    throw new Error("ERRO CRÍTICO: A variável de ambiente JWT_SECRET não foi definida!");
}

export const gerarToken = (payload: Partial<usuario>): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d", // Expira em 1 dia
    });
};

export const verificarToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};