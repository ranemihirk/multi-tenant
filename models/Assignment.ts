import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";
import { Shoot } from "./Shoot";

export class Assignment extends Model {
  declare id: number;
  declare shootId: number;
  declare userId: number;
  declare position: string | null;
  declare callTime: string | null;
  declare confirmed: boolean;
}

Assignment.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    shootId: {
      type: DataTypes.BIGINT,
      references: { model: Shoot, key: "id" },
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      references: { model: User, key: "id" },
      allowNull: false,
    },
    position: DataTypes.TEXT,
    callTime: DataTypes.TIME,
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "Assignment",
    timestamps: false,
  }
);
