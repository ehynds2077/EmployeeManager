import e from "express";
import { json } from "stream/consumers";
import pg from "../db";
import { getEmployeeByID } from "./User";

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

export const getTotal = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  const getBonus = await getBonusTotal(empID, beginDate, endDate);
  const getHours = await getHoursMiles(empID, beginDate, endDate);
  console.log(getHours);
  var bonus: number = 0;

  if (getHours.length) {
    if (getBonus.length) {
      bonus = parseFloat(getBonus[0].earned);
    }

    const res = {
      employeeID: getHours[0].employeeID,
      fName: getHours[0].fName,
      lName: getHours[0].lName,
      hours: parseFloat(getHours[0].hours),
      miles: parseFloat(getHours[0].miles),
      hoursEarned: parseFloat(getHours[0].hoursEarned),
      milesEarned: parseFloat(getHours[0].milesEarned),
      bonusEarned: bonus,
      total: parseFloat(getHours[0].total) + bonus,
    };

    return res;
  } else {
    const user = await getEmployeeByID(empID);
    const res = {
      employeeID: user[0].employeeID,
      fName: user[0].fName,
      lName: user[0].lName,
      hours: 0,
      miles: 0,
      hoursEarned: 0,
      milesEarned: 0,
      bonusEarned: 0,
      total: 0,
    };
    return res;
  }
};

export const getHoursMiles = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  console.log(empID);
  const total = await pg
    .select({
      employeeID: "employee.id",
      fName: "first_name",
      lName: "last_name",
      hours: pg.raw("sum(??)", ["timesheet_entry.hours"]),
      miles: pg.raw("sum(??)", ["timesheet_entry.miles"]),
      hoursEarned: pg.raw("sum(??) * ??", ["hours", "hourly_rate"]),
      milesEarned: pg.raw("sum(??) * ??", ["miles", "miles_rate"]),
      total: pg.raw("sum(??) * ?? + sum(??) * ??", [
        "hours",
        "hourly_rate",
        "miles",
        "miles_rate",
      ]),
    })
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
  return total;
};

export const getBonusDetails = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  var coalesce = pg.raw(
    "coalesce((case when pickup AND wet_unit IS NOT TRUE then pickup_rate_dry/num_emps end),(case when pickup AND wet_unit then pickup_rate_wet/num_emps end),(case when pickup IS NOT TRUE AND wet_unit IS NOT TRUE then del_rate_wet/num_emps end),(case when pickup IS NOT TRUE AND wet_unit then del_rate_dry/num_emps end))as earned"
  );

  const ret = await pg
    .select(
      {
        employeeID: "employee.id",
        fName: "first_name",
        lName: "last_name",
        itemName: "bonus_item.name",
        pickup: "item_entry.pickup",
        wet: "item_entry.wet_unit",
        numEmps: "item_entry.num_emps",
      },
      coalesce
    )
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
    .join("employee", function () {
      this.on("timesheet_entry.emp_id", "=", "employee.id");
    })
    .join("email", function () {
      this.on("email.id", "=", "employee.email_id");
    })
    .join("users", function () {
      this.on("email.id", "=", "users.email_id");
    })
    .where("employee.id", empID)
    .andWhereBetween("date", [beginDate, endDate]);

  return ret;
};

export const getBonusTotal = async (
  empID: number,
  beginDate: Date,
  endDate: Date
) => {
  var coalesce = pg.raw(
    "sum(coalesce((case when pickup AND wet_unit IS NOT TRUE then pickup_rate_dry/num_emps end),(case when pickup AND wet_unit then pickup_rate_wet/num_emps end),(case when pickup IS NOT TRUE AND wet_unit IS NOT TRUE then del_rate_wet/num_emps end),(case when pickup IS NOT TRUE AND wet_unit then del_rate_dry/num_emps end))) as earned"
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
