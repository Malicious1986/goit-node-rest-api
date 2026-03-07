import sequelize from "./sequelize.js";
import "./assosiations.js";

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ force: true });
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};
