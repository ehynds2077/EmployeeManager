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
