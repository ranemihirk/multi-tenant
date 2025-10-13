"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Organization } from "./Organization";

export class EquipmentItem extends Model {
  declare id: number;
  declare tenantId: number;
  declare name: string;
  declare sku: string | null;
  declare serial: string | null;
  declare status: string;
  declare meta: object;
}

EquipmentItem.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Organization, key: "id" },
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    sku: DataTypes.TEXT,
    serial: DataTypes.TEXT,
    status: { type: DataTypes.TEXT, defaultValue: "available" },
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "EquipmentItem",
    timestamps: false,
  }
);
