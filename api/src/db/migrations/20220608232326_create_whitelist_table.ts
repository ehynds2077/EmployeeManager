import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("whitelist", (table) => {
    table.increments().notNullable();
    table.string("email").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists("whitelist");
}
