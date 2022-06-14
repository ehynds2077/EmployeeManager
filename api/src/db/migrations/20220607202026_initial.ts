import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("email", (table) => {
    table.increments().notNullable();
    table.string("email").unique().notNullable();
  });
  await knex.schema.createTable("user", (table) => {
    table.increments("id").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.boolean("is_admin").defaultTo(false).notNullable();
    table.integer("email_id").unsigned().references("id").inTable("email");
  });

  await knex.schema.createTable("employee", (table) => {
    table.increments().notNullable();
    table.decimal("hourly_rate", 14, 2);
    table.integer("email_id").unsigned().references("id").inTable("email");
  });

  await knex.schema.createTable("timesheet_entry", (table) => {
    table.increments().notNullable();
    table.integer("miles");
    table.decimal("hours", 14, 2);
    table.date("date").notNullable();
    table.integer("emp_id").unsigned().references("id").inTable("employee");
  });

  await knex.schema.createTable("bonus_item", (table) => {
    table.increments().notNullable();
    table.boolean("name").notNullable();
    table.integer("pickup_rate_dry").notNullable();
    table.integer("pickup_rate_wet").notNullable();
    table.integer("del_rate_dry").notNullable();
    table.integer("del_rate_wet").notNullable();
  });

  await knex.schema.createTable("includes", (table) => {
    table.boolean("wet_unit").notNullable();
    table.boolean("num_emps").notNullable();
    table
      .integer("entry_id")
      .unsigned()
      .references("id")
      .inTable("timesheet_entry");
    table.integer("item_id").unsigned().references("id").inTable("bonus_item");
    table.primary(["entry_id", "item_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    [
      "includes",
      "timesheet_entry",
      "user",
      "bonus_item",
      "employee",
      "email",
    ].map((tableName) => {
      return knex.schema.dropTableIfExists(tableName);
    })
  );
}
