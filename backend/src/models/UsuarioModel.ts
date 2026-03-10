import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import { usuario } from "../types";

interface UsuarioCreationAttributes extends Optional<usuario, 'id'> { }

class UsuarioModel extends Model<usuario, UsuarioCreationAttributes> implements usuario {
    public id!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UsuarioModel.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            defaultValue: "paciente",
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
    }
);

export default UsuarioModel;