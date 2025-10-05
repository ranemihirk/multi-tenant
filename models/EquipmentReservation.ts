import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";

export class EquipmentReservation extends Model {
  declare id: number;
  declare equipmentId: number;
  declare shootId: number;
  declare startTime: Date;
  declare endTime: Date;
  declare createdBy: number;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EquipmentReservation.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    equipmentId: { type: DataTypes.BIGINT, allowNull: false },
    shootId: { type: DataTypes.BIGINT, allowNull: false },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    createdBy: {
      type: DataTypes.BIGINT,
      references: { model: User, key: "id" },
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "EquipmentReservation", timestamps: false }
);
