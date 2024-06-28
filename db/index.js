import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

export const sequelize = new Sequelize("students_db", process.env.DB_USER, process.env.DB_PW, {
  dialect: "mysql",
  // host: process.env.DB_HOST,
  dialectOptions:{
    socketPath : process.env.DB_HOST
  }
});
