import { Sequelize } from "sequelize";

const db = new Sequelize("pa_3", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
