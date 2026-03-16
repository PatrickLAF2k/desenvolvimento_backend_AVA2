import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import { usuario } from "../types";

interface UsuarioCreationAttributes extends Optional<usuario, 'id'> { }

class UsuarioModel extends Model<usuario, UsuarioCreationAttributes> implements usuario {
    public id!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: "paciente" | "admin";
    public telefone!: string;
    public cep!: string;
    public rua!: string;
    public bairro!: string;
    public cidade!: string;
    public uf!: string;

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
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
    }
);

export default UsuarioModel;