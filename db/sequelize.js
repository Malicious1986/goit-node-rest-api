import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
