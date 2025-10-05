import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Project } from "./Project";
import { Organization } from "./Organization";

export class Shoot extends Model {
  declare id: number;
  declare projectId: number;
  declare tenantId: number;
  declare date: Date;
  declare location: string;
  declare callTime: string;
  declare wrapTime: string;
  declare notes: string;
  declare status: string;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Shoot.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    projectId: {
      type: DataTypes.BIGINT,
      references: { model: Project, key: "id" },
      onDelete: "CASCADE",
    },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
      onDelete: "CASCADE",
    },
    date: { type: DataTypes.DATE, allowNull: false },
    location: DataTypes.TEXT,
    callTime: DataTypes.TIME,
    wrapTime: DataTypes.TIME,
    notes: DataTypes.TEXT,
    status: { type: DataTypes.TEXT, defaultValue: "scheduled" },
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
  { sequelize, modelName: "Shoot" }
);
