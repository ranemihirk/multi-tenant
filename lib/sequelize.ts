import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import * as dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "",
  process.env.DATABASE_USERNAME || "",
  process.env.DATABASE_PASSWORD || "",
  {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
  }
);
