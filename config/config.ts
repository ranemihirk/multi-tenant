import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

interface DBConfig {
  username: string | undefined;
  password: string | undefined;
  database: string;
  host: string;
  port: number;
  dialect: "mysql";
  dialectModule: any;
}

interface EnvConfig {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: EnvConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_dev",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: "mysql",
    dialectModule: mysql,
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_test",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: "mysql",
    dialectModule: mysql,
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_prod",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: "mysql",
    dialectModule: mysql,
  },
};

export default config;
