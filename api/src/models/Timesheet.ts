import pg from "../db";

const tableName = "timesheet_entry";

export interface Timesheet {
  date: Date;
  miles: number;
  hours: number;
  user_id: number;
  entry_id: number;
}

export const createEntry = async (
  date: Date,
  hours: number,
  miles: number,
  user_id: number
) => {
  const result = await pg.table(tableName).insert({
    date: date,
    hours: hours,
    miles: miles,
    user_id: user_id,
  });
};
