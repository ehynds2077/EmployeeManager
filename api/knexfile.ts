import { config } from "./src/config";
import * as path from "path";

const BASE_PATH = path.join(__dirname, "src", "db");

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
    directory: path.join(BASE_PATH, "migrations"),
  },
};

module.exports = {
  development,
};
