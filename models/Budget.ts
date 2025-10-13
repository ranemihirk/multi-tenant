"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Organization } from "./Organization";
import { Project } from "./Project";

export class Budget extends Model {
  declare id: number;
  declare projectId: number;
  declare tenantId: number;
  declare name: string;
  declare totalEst: number;
  declare totalActual: number;
}

Budget.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    projectId: {
      type: DataTypes.BIGINT,
      references: { model: Project, key: "id" },
    },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
    },
    name: DataTypes.TEXT,
    totalEst: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
    totalActual: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  },
  { sequelize, modelName: "Budget", timestamps: false }
);
