import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Organization } from "./Organization";

export class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare role: "ADMIN" | "PRODUCTION" | "CREW";
  declare organizationId: string;
}

User.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    role: {
      type: DataTypes.ENUM("ADMIN", "PRODUCTION", "CREW"),
      defaultValue: "CREW",
    },
  },
  { sequelize, modelName: "user" }
);

Organization.hasMany(User, { foreignKey: "organizationId" });
User.belongsTo(Organization, { foreignKey: "organizationId" });
