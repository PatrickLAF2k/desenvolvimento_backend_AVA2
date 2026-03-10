import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import { agendamento } from "../types";

interface AgendamentoCreationAttributes extends Optional<agendamento, 'id'> { }

class AgendamentoModel extends Model<agendamento, AgendamentoCreationAttributes> implements agendamento {
    public id!: string;
    public id_usuario!: string;
    public id_medico!: string;
    public data!: string;
    public hora!: string;
    public status!: 'agendada' | 'cancelada' | 'concluida' | 'confirmada';
    public observacao?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AgendamentoModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'usuarios', key: 'id' }
        },
        id_medico: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'medicos', key: 'id' }
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('agendada', 'confirmada', 'cancelada', 'concluida'),
            defaultValue: 'agendada',
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "agendamentos",
        timestamps: true,
    }
);

export default AgendamentoModel;