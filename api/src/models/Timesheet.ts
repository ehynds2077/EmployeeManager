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
  return result[0];
};
