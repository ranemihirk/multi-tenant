import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";
import { Organization } from "./Organization";
import { Project } from "./Project";

export class Asset extends Model {
  declare id: number;
  declare tenantId: number;
  declare projectId: number;
  declare filename: string;
  declare url: string;
  declare version: number;
  declare metadata: object;
  declare createdBy: number;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Asset.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
    },
    projectId: {
      type: DataTypes.BIGINT,
      references: { model: Project, key: "id" },
    },
    filename: { type: DataTypes.TEXT, allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: false },
    version: { type: DataTypes.INTEGER, defaultValue: 1 },
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
  { sequelize, modelName: "Asset" }
);
