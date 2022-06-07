import { config } from "../config";

module.exports = {
  development: {
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
      directory: "./migrations",
    },
  },
};
