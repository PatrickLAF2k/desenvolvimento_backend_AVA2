import { Router } from "express";
import { cadastro } from "./controllers/usuarios/cadastrarUsuario";
import { validarCadastro } from "./middlewares/validarCadastro";
import { login } from "./controllers/usuarios/login";
import { autenticacaoMiddleware } from "./middlewares/authMiddleware";
import { listarMedicos } from "./controllers/medicos/listarMedicos";
import { agendamento } from "./controllers/consultas/agendarConsulta";
import { listarMeusAgendamentos } from "./controllers/consultas/listarMeusAgendamentos";
import { listarAgendamentos } from "./controllers/consultas/listarAgendamentos";
import { validarAgendamento } from "./middlewares/validarAgendamento";
import { getStats } from "./controllers/dashboard/getStats";

const router = Router();


router.post("/cadastro", validarCadastro, cadastro);
router.post("/login", login);

router.use(autenticacaoMiddleware);

router.post("/agendarConsulta", validarAgendamento, agendamento)

router.get("/listarMedicos", listarMedicos)
router.get("/listarMeusAgendamentos", listarMeusAgendamentos)
router.get("/listarAgendamentos", listarAgendamentos)
router.get("/getStats", getStats)


export default router;