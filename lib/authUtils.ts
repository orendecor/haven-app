import bcrypt from "bcrypt";

export async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
  console.log(plainTextPassword,hashedPassword);
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
  