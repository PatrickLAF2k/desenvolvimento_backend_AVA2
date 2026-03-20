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
import { perfil } from "./controllers/dashboard/perfil";
import { cancelarAgendamento } from "./controllers/consultas/cancelarAgendamento";
import { getStatsPaciente } from "./controllers/dashboard/getStatsPacientes";
import { prepararAgendamento } from "./controllers/consultas/prepararAgendamento";

const router = Router();


router.post("/cadastro", validarCadastro, cadastro);
router.post("/login", login);

router.use(autenticacaoMiddleware);

router.post("/agendarConsulta", validarAgendamento, agendamento);
router.patch("/cancelarAgendamento/:id", cancelarAgendamento);

router.get("/agendamentoPacientestatus", prepararAgendamento);
router.get("/listarMeusAgendamentos", listarMeusAgendamentos);
router.get("/listarAgendamentos", listarAgendamentos);
router.get("/getStats", getStats);
router.get("/getStatsPaciente", getStatsPaciente);
router.get("/perfil", perfil);


export default router;