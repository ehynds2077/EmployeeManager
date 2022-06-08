import knex from "knex";
import pg from "../db";

const tableName = "user";

export interface User {
  fName?: string;
  lName?: string;
  email: string;
  password: string;
  id: string;
}

export const getUserByEmail = async (email: string) => {
  const users = await pg.select().table(tableName).where("email", email);
  if (users.length) {
    return users[0];
  } else {
    return null;
  }
};

export const getUserByID = async (id: string) => {
  const users = await pg.select().table(tableName).where("id", id);
  if (users.length) {
    return users[0];
  } else {
    return null;
  }
};

export const addUser = async (
  fName: string,
  lName: string,
  email: string,
  password: string,
  rate: number,
  admin: boolean
) => {
  console.log("AddUser!!");
  const result = await pg.table("user").insert({
    first_name: fName,
    last_name: lName,
    email: email,
    hourly_rate: rate,
    password: password,
    is_admin: admin,
  });
  console.log(result);

  console.log("User added");
};
