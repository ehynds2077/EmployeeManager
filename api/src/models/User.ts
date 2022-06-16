import knex from "knex";
import pg from "../db";

const tableName = "user";

export interface User {
  fName?: string;
  lName?: string;
  email: string;
  password: string;
  id: number;
  admin: boolean;
}

export const addEmail = async (email: string) => {
  try {
    const addEmail = await pg
      .table("email")
      .insert({ email: email })
      .returning("id");
    return addEmail[0].id;
  } catch (err) {
    throw new Error("User with this email already exists");
  }
};

export const getEmailByName = async (email: string) => {
  const ret = await pg.select().table("email").where("email", email);
  if (ret.length) {
    console.log(ret[0].id);
    return ret[0].id;
  } else {
    return null;
  }
};

export const getEmailByID = async (emailID: number) => {
  const ret = await pg.select().table("email").where("id", emailID);
  if (ret.length) {
    console.log(ret[0].email);
    return ret[0].email;
  } else {
    return null;
  }
};

export const addUser = async (
  fName: string,
  lName: string,
  email_id: number,
  password: string,
  admin: boolean
) => {
  // Need to check if email exists already and throw error if it does
  const emailExists = await getEmailByID(email_id);
  console.log(`emailExists: ${emailExists}`);
  if (emailExists) {
    throw new Error("User with this email already exists");
  }
  const result = await pg.table(tableName).insert({
    first_name: fName,
    last_name: lName,
    password: password,
    is_admin: admin,
    email_id: email_id,
  });
  console.log(result);
};

export const addEmployee = async (rate: number, email_id: number) => {
  const result = await pg.table("employee").insert({
    hourly_rate: rate,
    email_id: email_id,
  });
};

export const getUserByEmail = async (email: string) => {
  const curUser = await pg
    .select("first_name", "last_name", "email", "password")
    .from("user")
    .join("email", function () {
      this.on("user.email_id", "=", "email.id");
    })
    .where("email", email);

  console.log(curUser);
  if (curUser.length) {
    return curUser[0];
  } else {
    return null;
  }
};
