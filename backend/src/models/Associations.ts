import UsuarioModel from "./UsuarioModel";
import MedicoModel from "./MedicoModel";
import AgendamentoModel from "./AgendamentoModel";

AgendamentoModel.belongsTo(UsuarioModel, {
    foreignKey: 'id_usuario',
    as: 'paciente'
});

AgendamentoModel.belongsTo(MedicoModel, {
    foreignKey: 'id_medico',
    as: 'medico'
});

UsuarioModel.hasMany(AgendamentoModel, { foreignKey: 'id_usuario' });
MedicoModel.hasMany(AgendamentoModel, { foreignKey: 'id_medico' });