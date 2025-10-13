"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";
import { Organization } from "./Organization";

export class AuditLog extends Model {
  declare id: number;
  declare tenantId: number;
  declare userId: number;
  declare action: string;
  declare resource: string | null;
  declare resourceId: string | null;
  declare meta: object;
}

AuditLog.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      references: { model: User, key: "id" },
      allowNull: false,
    },
    action: { type: DataTypes.TEXT, allowNull: false },
    resource: DataTypes.TEXT,
    resourceId: DataTypes.TEXT,
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  { sequelize, modelName: "AuditLog", timestamps: false }
);
