import express from "express";
import cors from "cors";
import routes from "./routes";
import { sequelize } from "./database";

import "./models/UsuarioModel";
import "./models/MedicoModel";
import "./models/AgendamentoModel";
import "./models/Associations";


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.sync({ alter: false });
        console.log("Banco de dados sincronizado.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
    }
}

startServer();