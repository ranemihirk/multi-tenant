"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Budget } from "./Budget";

export class BudgetLine extends Model {
  declare id: number;
  declare budgetId: number;
  declare category: string;
  declare description: string;
  declare estimate: number;
  declare actual: number;
}

BudgetLine.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    budgetId: {
      type: DataTypes.BIGINT,
      references: { model: Budget, key: "id" },
      allowNull: false,
    },
    category: DataTypes.TEXT,
    description: DataTypes.TEXT,
    estimate: DataTypes.DECIMAL(12, 2),
    actual: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  },
  { sequelize, modelName: "BudgetLine", timestamps: false }
);
