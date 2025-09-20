import "server-only";
import { sequelize } from "./sequelize";
import { Organization } from "@/models/Organization";
import { User } from "@/models/User";

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established.");

    // Sync models
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced.");
  } catch (err) {
    console.error("❌ Database error:", err);
  }
}
