import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("email", (table) => {
    table.increments().notNullable();
    table.string("email").unique().notNullable();
  });
  await knex.schema.createTable("users", (table) => {
    table.increments("id").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.boolean("is_admin").defaultTo(false).notNullable();
    table
      .integer("email_id")
      .unique()
      .unsigned()
      .references("id")
      .inTable("email");
  });

  await knex.schema.createTable("employee", (table) => {
    table.increments().notNullable();
    table.decimal("hourly_rate", 14, 2);
    table.decimal("miles_rate", 14, 2);
    table.integer("email_id").unsigned().references("id").inTable("email");
  });

  await knex.schema.createTable("timesheet_entry", (table) => {
    table.increments().notNullable();
    table.integer("miles");
    table.decimal("hours", 14, 2);
    table.date("date").notNullable();
    table.integer("emp_id").unsigned().references("id").inTable("employee");
    table.unique(["date", "emp_id"]);
  });

  await knex.schema.createTable("bonus_item", (table) => {
    table.increments().notNullable();
    table.string("name").notNullable();
  });

  await knex.schema.createTable("item_entry", (table) => {
    table.increments().notNullable();
    table.boolean("pickup").notNullable();
    table.boolean("wet_unit").notNullable();
    table.integer("num_emps").notNullable();
    table
      .integer("entry_id")
      .unsigned()
      .references("id")
      .inTable("timesheet_entry");
    table.integer("item_id").unsigned().references("id").inTable("bonus_item");
  });

  await knex.schema.createTable("rates", (table) => {
    table.increments().notNullable();
    table.integer("pickup_rate_dry").notNullable();
    table.integer("pickup_rate_wet").notNullable();
    table.integer("del_rate_dry").notNullable();
    table.integer("del_rate_wet").notNullable();
    table.integer("item_id").unsigned().references("id").inTable("bonus_item");
  });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    [
      "item_entry",
      "timesheet_entry",
      "users",
      "rates",
      "bonus_item",
      "employee",
      "email",
    ].map((tableName) => {
      return knex.schema.dropTableIfExists(tableName);
    })
  );
}
