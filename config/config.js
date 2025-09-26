// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_dev",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: process.env.DATABASE_DIALECT || "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_test",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: process.env.DATABASE_DIALECT || "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "my_db_prod",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    dialect: process.env.DATABASE_DIALECT || "mysql",
  },
};
