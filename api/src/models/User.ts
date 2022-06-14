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

export const emailSearch = async (email: string) => {
  const ret = await pg.select().table("email").where("email", email);
  if (ret.length) {
    console.log(ret[0].id);
    return ret[0].id;
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

// export const AdminAddEmployee = async (email: string, rate: number) => {
//   var email_id: number = await addEmail(email);
//   await addEmployee(rate, email_id);
// };

export const getUserByEmail = async (email: string) => {
  const curUser = await pg
    .select("first_name", "last_name", "email", "password")
    .from("user")
    .join("email", function () {
      this.on("user.email_id", "=", "email.id");
    });

  console.log(curUser);
  if (curUser.length) {
    return curUser[0];
  } else {
    return null;
  }
};

// export const getUserByID = async (id: string) => {
//   const users = await pg.select().table(tableName).where("id", id);
//   if (users.length) {
//     return users[0];
//   } else {
//     return null;
//   }
// };

// export const addUser = async (
//   fName: string,
//   lName: string,
//   email: string,
//   password: string,
//   rate: number,
//   admin: boolean
// ) => {
//   const result = await pg.table(tableName).insert({
//     first_name: fName,
//     last_name: lName,
//     email: email,
//     hourly_rate: rate,
//     password: password,
//     is_admin: admin,
//   });
//   console.log(result);
// };
