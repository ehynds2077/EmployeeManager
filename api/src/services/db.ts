import knex from "knex";
import { config } from "../config";

const pg = knex({
  client: "pg",
  connection: {
    host: "db",
    port: 5432,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
  },
  acquireConnectionTimeout: 400000,
});

// Test connection
pg.raw("SELECT 1")
  .then(() => {
    console.log("postgres connected");
  })
  .catch((e) => {
    console.log("postgres not connected");
    console.log(e);
  });

const initSchema = async () => {
  const schema = pg.schema.withSchema("public");
  await schema.createTable("user", (table) => {
    table.string("name");
  });
};

const initDb = async () => {
  await initSchema();
  await pg.table("user").insert({ name: "test 1" });
  await pg.table("user").insert({ name: "test 2222222" });
  await pg.table("user").insert({ name: "test 3333333" });
};

export const testDb = async () => {
  const exists = await pg.schema.hasTable("user");
  if (!exists) {
    await initDb();
  }

  const users = await pg.select().table("user");
  console.log(users);
};

export default pg;
