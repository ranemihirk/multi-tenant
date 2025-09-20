import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export class Organization extends Model {
  declare id: string;
  declare name: string;
  declare slug: string;
  declare plan: string;
  declare stripeId: string | null;
}

Organization.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    plan: { type: DataTypes.STRING, defaultValue: "FREE" },
    stripeId: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "organization" }
);
