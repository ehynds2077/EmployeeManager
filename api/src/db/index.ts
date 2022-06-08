import knex from "knex";
import { config } from "../config";
import { development } from "./knexfile";

const pg = knex(development);

// Test connection
pg.raw("SELECT 1")
  .then(() => {
    console.log("postgres connected");
  })
  .catch((e) => {
    console.log("postgres not connected");
    console.log(e);
  });

// const initSchema = async () => {
//   const schema = pg.schema.withSchema("public");
//   await schema.createTable("user", (table) => {
//     table.string("fName");
//     table.string("lName");
//     table.string("password").notNullable();
//     table.string("email").unique().notNullable();
//     table
//       .uuid("id")
//       .primary()
//       .unique()
//       .defaultTo(pg.raw("(gen_random_uuid())"));
//   });
// };

// const initDb = async () => {
//   await initSchema();
//   await pg.table("user").insert({
//     fName: "test 1",
//     lName: "last",
//     password: "yo",
//     email: "yo@yo.com",
//   });
//   await pg.table("user").insert({
//     fName: "test 2222222",
//     lName: "last22",
//     password: "yyoooo",
//     email: "asdf@yao.com",
//   });
// };

export const testDb = async () => {
  const migrateRes = await pg.migrate.latest();
  console.log(migrateRes);

  // const exists = await pg.schema.hasTable("user");
  // if (!exists) {
  //   await initDb();
  // }

  // const users = await pg.select().table("user");
  // console.log(users);
};

export default pg;
