import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const dbUrl = process.env.DATABASE_URL;

export const sequelize = dbUrl 
  ? new Sequelize(dbUrl, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      }
    })
  : new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USER as string,
      process.env.DB_PASS as string,
      {
        host: process.env.DB_HOST,
        dialect: "mysql", 
      }
    );