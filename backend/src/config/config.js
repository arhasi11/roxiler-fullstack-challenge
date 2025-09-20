import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,   // add explicit port
    logging: process.env.DB_LOGGING === "true" ? console.log : false, // toggle logging
    pool: {
      max: 10,   // better for production
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Function to test DB connection before starting the server
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1); // stop server if DB fails
  }
}
