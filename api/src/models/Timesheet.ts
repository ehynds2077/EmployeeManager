import pg from "../db";

const tableName = "timesheet_entry";

export interface Timesheet {
  date: Date;
  miles: number;
  hours: number;
  emp_id: number;
  entry_id: number;
}

export const createEntry = async (
  date: Date,
  hours: number,
  miles: number,
  emp_id: number
) => {
  const result = await pg.table(tableName).insert({
    date: date,
    hours: hours,
    miles: miles,
    emp_id: emp_id,
  });
  return result;
};

export const getTotal = async (beginDate: Date, endDate: Date) => {};

export const getHoursMiles = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  console.log(empID);
  const total = await pg
    .select("employee.id", "first_name", "last_name")
    .sum({ hours: "hours", miles: "miles" })
    .from(tableName)
    .rightJoin("employee", function () {
      this.on("employee.id", "=", "timesheet_entry.emp_id");
    })
    .join("users", function () {
      this.on("employee.email_id", "=", "users.email_id");
    })
    .where("employee.id", empID)
    .andWhereBetween("date", [beginDate, endDate])
    .groupBy("employee.id", "first_name", "last_name");
  return total[0];
};

export const getBonusTotal = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  var coalesce = pg.raw(
    "sum(coalesce((case when pickup AND wet_unit IS NOT TRUE then rates.pickup_rate_dry end),(case when pickup AND wet_unit then pickup_rate_wet end),(case when pickup IS NOT TRUE AND wet_unit IS NOT TRUE then del_rate_wet end),(case when pickup IS NOT TRUE AND wet_unit then del_rate_dry end))) as earned"
  );

  const ret = await pg
    .select("timesheet_entry.emp_id", coalesce)
    .from(tableName)
    .join("item_entry", function () {
      this.on("item_entry.entry_id", "=", "timesheet_entry.id");
    })
    .join("bonus_item", function () {
      this.on("bonus_item.id", "=", "item_entry.item_id");
    })
    .join("rates", function () {
      this.on("rates.item_id", "=", "bonus_item.id");
    })
    .whereBetween("date", [beginDate, endDate])
    .groupBy("timesheet_entry.emp_id")
    .having("timesheet_entry.emp_id", "=", empID);

  return ret;
};
