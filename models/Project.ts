import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Organization } from "./Organization";
import { User } from "./User";

export class Project extends Model {
  declare id: number;
  declare tenantId: number;
  declare name: string;
  declare code: string | null;
  declare description: string | null;
  declare clientName: string | null;
  declare status: string;
  declare startDate: Date | null;
  declare endDate: Date | null;
  declare metadata: object;
  declare createdBy: number;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Project.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
      onDelete: "CASCADE",
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    code: DataTypes.TEXT,
    description: DataTypes.TEXT,
    clientName: DataTypes.TEXT,
    status: { type: DataTypes.TEXT, defaultValue: "pre-production" },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
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
  { sequelize, modelName: "Project", timestamps: false }
);
