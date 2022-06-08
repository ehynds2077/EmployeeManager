import { config } from "../config";

export const development = {
  client: "pg",
  connection: {
    host: "db",
    port: 5432,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
  },
  acquireConnectionTimeout: 400000,
  migrations: {
    directory: "./src/db/migrations",
  },
};

module.exports = {
  development,
};
