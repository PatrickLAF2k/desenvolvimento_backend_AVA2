import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import { medico } from "../types";

interface MedicoCreationAttributes extends Optional<medico, 'id'> { }

class MedicoModel extends Model<medico, MedicoCreationAttributes> implements medico {
    public id!: string;
    public nome!: string;
    public especialidade!: string;
    public crm!: string;
    public email!: string;
    public telefone?: string;
}

MedicoModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        especialidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crm: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Garante que não existam dois médicos com o mesmo CRM
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validação nativa do Sequelize
            },
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "medicos",
        timestamps: true,
    }
);

export default MedicoModel;