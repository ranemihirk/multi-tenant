"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Project } from "./Project";
import { User } from "./User";

export class Expense extends Model {
  declare id: number;
  declare tenantId: number;
  declare projectId: number | null;
  declare budgetLineId: number | null;
  declare amount: number;
  declare currency: string;
  declare spentAt: Date;
  declare vendorId: number | null;
  declare receiptUrl: string | null;
  declare approved: boolean;
  declare createdBy: number;
}

Expense.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: { type: DataTypes.BIGINT, allowNull: false },
    projectId: {
      type: DataTypes.BIGINT,
      references: { model: Project, key: "id" },
    },
    budgetLineId: DataTypes.BIGINT,
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.TEXT, defaultValue: "INR" },
    spentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    vendorId: DataTypes.BIGINT,
    receiptUrl: DataTypes.TEXT,
    approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: {
      type: DataTypes.BIGINT,
      references: { model: User, key: "id" },
    },
  },
  { sequelize, modelName: "Expense", timestamps: false }
);
